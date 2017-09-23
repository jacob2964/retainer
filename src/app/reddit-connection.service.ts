import { SavedPost } from './saved-posts/saved-post';
import { Injectable } from '@angular/core';
import { RandomService } from './random.service';
import { Response, Headers, Http, RequestOptions } from '@angular/http';
import { Token } from 'app/token';
import { RetainerConfig } from 'app/retainer-configuration';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class RedditConnectionService {

    private _state: string;
    private _token: string;
    private _username: string;

    public get state(): string {
        return this._state;
    }

    public get token(): string {
        return this._token;
    }

    public get username(): string {
        return this._username;
    }

    public constructor(private _randomService: RandomService, private _http: Http) {
        this._state = this._randomService.generateStateString(20);
    }

    public getRedditAuthorizationUrl(): string {
        localStorage.setItem('state', this._state);
        return `${RetainerConfig.redditBaseUrl}api/v1/authorize?client_id=upw3i_YafZpoXw&response_type=code` +
            `&state=${this._state}&redirect_uri=${RetainerConfig.redirectUrl}saved-posts&duration=temporary&scope=history,identity`;
    }

    public getUserPosts(code: string): Observable<SavedPost[]> {
        return this.getAuthorizationTokenWithCode(code)
            .flatMap(token => this.getUsernameForAuthenticatedUser(token)
                .flatMap(username => this.getSavedPostsForAuthenticatedUser(username)));
    }

    private getAuthorizationTokenWithCode(code: string): Observable<string> {
        const headers = new Headers();
        const requestOptions = new RequestOptions({ headers: headers });
        headers.append('Authorization', 'Basic dXB3M2lfWWFmWnBvWHc6NzdkMzRocWFSYUpreUxLNno1eGo2NWF4WWRV');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const body = `grant_type=authorization_code&code=${code}` +
            `&redirect_uri=${RetainerConfig.redirectUrl}saved-posts`;
        return this._http.post(`${RetainerConfig.redditBaseUrl}api/v1/access_token`, body, requestOptions)
            .map(response => this.mapToken(response.json()));
    }

    private mapToken(response: Token) {
        this._token = response.access_token;
        return this._token;
    }

    private getUsernameForAuthenticatedUser(token: string): Observable<string> {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        return this._http.get(`${RetainerConfig.redditOauthUrl}api/v1/me`, { headers: headers })
            .map(response => this.mapUsername(response.json()));
    }

    private mapUsername(response: any) {
        this._username = response.name;
        return this._username;
    }

    private getSavedPostsForAuthenticatedUser(username: string): Observable<SavedPost[]> {
        const userPosts = [];
        return this.getRequest(username, undefined)
            .expand(response => {
                if (response.data) {
                    for (const post of response.data.children) {
                        userPosts.push(post);
                    }
                    if (response.data.after) {
                        return this.getRequest(username, response.data.after);
                    }
                    return Observable.of(userPosts);
                }
                return Observable.empty();
            });
    }

    private getRequest(username: string, after: string) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this._token}`);
        const redditUrl = `${RetainerConfig.redditOauthUrl}user/${username}/saved`;
        const url = after ? `${redditUrl}/?after=${after}` : redditUrl;

        return this._http.get(url, { headers: headers })
            .map(response => response.json());
    }
}
