import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RedditConnectionService } from 'app/reddit-connection.service';
import { SavedPost } from 'app/saved-posts/saved-post';
import { Observable } from 'rxjs/Observable';
import { Any } from 'test/test-helpers/any';

@Injectable()
export class SavedPostsResolver implements Resolve<SavedPost[]> {

    constructor(private _redditConnectionService: RedditConnectionService) { }
    resolve(route: ActivatedRouteSnapshot) {
        const stateMatch = route.queryParams['state'] === localStorage.getItem('state');
        if (stateMatch) {
            return this._redditConnectionService.getUserPosts(route.queryParams['code']);
        }
        return [];
    }
}
