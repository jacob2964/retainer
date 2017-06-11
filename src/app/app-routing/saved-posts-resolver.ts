import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RedditConnectionService } from 'app/reddit-connection.service';
import { SavedPost } from 'app/saved-posts/saved-post';

@Injectable()
export class SavedPostsResolver implements Resolve<SavedPost> {

    constructor(private _redditConnectionService: RedditConnectionService) { }
    resolve() {
        return null;
    }
}
