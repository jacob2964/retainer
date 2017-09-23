import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RedditConnectionService } from 'app/reddit-connection.service';
import { SavedPost } from 'app/saved-posts/saved-post';
import { Observable } from 'rxjs/Observable';
import { Any } from 'test/test-helpers/any';

@Injectable()
export class SavedPostsResolver implements Resolve<SavedPost[]> {

    constructor(private _redditConnectionService: RedditConnectionService, private _activatedRouteSnapshot: ActivatedRouteSnapshot) { }
    resolve() {
        const stateMatch = this._activatedRouteSnapshot.queryParams['state'] === localStorage.getItem('state');
        if (stateMatch) {
            return this._redditConnectionService.getUserPosts(this._activatedRouteSnapshot.queryParams['code']);
        }
        return [];
    }
}
