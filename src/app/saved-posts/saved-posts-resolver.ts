import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RedditConnectionService } from 'app/reddit-connection.service';
import { SavedPost } from 'app/saved-posts/saved-post';
import { Observable, of } from 'rxjs';

@Injectable()
export class SavedPostsResolver implements Resolve<SavedPost[]> {

    constructor(private _redditConnectionService: RedditConnectionService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<SavedPost[]> {
        const localStorageState = localStorage.getItem('state');
        const stateMatch = route.queryParams['state'] === localStorageState || localStorageState === null;
        if (stateMatch) {
            return this._redditConnectionService.getUserPosts(route.queryParams['code']);
        }
        return of([]);
    }
}
