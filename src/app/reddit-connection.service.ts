import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, empty, Observable } from 'rxjs';
import { SavedPost } from './saved-posts/saved-post';
import { RandomService } from './random.service';
import { Token } from 'app/token';
import { RetainerConfig } from 'app/retainer-configuration';
import { User } from 'app/user/user';
import { expand, mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

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

    public constructor(private _randomService: RandomService, private _http: HttpClient, private _router: Router) {
        this._state = this._randomService.generateStateString(20);
    }

    public getRedditAuthorizationUrl(): string {
        localStorage.setItem('state', this._state);
        return `${RetainerConfig.redditBaseUrl}api/v1/authorize.compact?client_id=${environment.applicationID}&response_type=code` +
            `&state=${this._state}&redirect_uri=${environment.redirectUrl}saved-posts&duration=temporary&scope=history,identity`;
    }

    public getUserPosts(code: string): Observable<SavedPost[]> {
        const currentToken = sessionStorage.getItem('token');
        if (currentToken) {
            return this.getUsernameForAuthenticatedUser(currentToken).pipe(
                mergeMap((user: User) => this.getSavedPostsForAuthenticatedUser(user.name)),
                catchError(error => {
                    console.log('Could not get saved posts');
                    console.log(error);
                    sessionStorage.setItem('token', null);
                    this._router.navigate(['landing']);
                    return of(null);
                }));
        } else {
            return this.getAuthorizationTokenWithCode(code).pipe(
                mergeMap((token: Token) => this.getUsernameForAuthenticatedUser(token.access_token)),
                mergeMap((user: User) => this.getSavedPostsForAuthenticatedUser(user.name)),
                catchError((error: Error) => {
                    console.log('Could not get saved posts');
                    console.log(error);
                    this._router.navigate(['landing']);
                    return of(null);
                }));
        }
    }

    private getAuthorizationTokenWithCode(code: string): Observable<Token> {
        const credentials = window.btoa(`${environment.applicationID}:${environment.secret}`)
        const headers = new HttpHeaders()
            .set('Authorization', `Basic ${credentials}`)
            .set('Content-Type', 'application/x-www-form-urlencoded');
        const body = `grant_type=authorization_code&code=${code}` +
            `&redirect_uri=${environment.redirectUrl}saved-posts`;
        return this._http.post<Token>(`${RetainerConfig.redditBaseUrl}api/v1/access_token`, body, { headers: headers });
    }

    private getUsernameForAuthenticatedUser(token: string): Observable<User> {
        this._token = token;
        sessionStorage.setItem('token', token);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this._http.get<User>(`${RetainerConfig.redditOauthUrl}api/v1/me`, { headers });
    }

    private getSavedPostsForAuthenticatedUser(username: string): Observable<SavedPost[]> {
        this._username = username;
        const userPosts = [];
        return this.getRequest(username, undefined).pipe(
            expand(response => {
                if (response.data) {
                    for (const post of response.data.children) {
                        userPosts.push(post);
                    }
                    if (response.data.after) {
                        return this.getRequest(username, response.data.after);
                    }
                    return of(userPosts);
                }
                return empty();
            }));
    }

    private getRequest(username: string, after: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this._token}`);
        const redditUrl = `${RetainerConfig.redditOauthUrl}user/${username}/saved`;
        const url = after ? `${redditUrl}/?after=${after}` : redditUrl;
        return this._http.get<any>(url, { headers });
    }
}
