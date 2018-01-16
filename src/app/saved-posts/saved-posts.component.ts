import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RedditConnectionService } from 'app/reddit-connection.service';
import { SavedPost } from 'app/saved-posts/saved-post';
import { Dictionary } from 'app/collections/dictionary';

@Component({
    selector: 'app-saved-posts',
    templateUrl: './saved-posts.component.html',
    styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {

    public savedPosts: Dictionary<string, SavedPost>;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        const savedPosts = this._activatedRoute.snapshot.data.savedPosts;
        this.createSavedPostsDictionary(savedPosts);
        console.log(this.savedPosts.keys[0]);
    }

    private hasImage(post: SavedPost): boolean {
        return post.data.thumbnail !== 'default' && post.data.thumbnail !== 'self';
    }

    private createSavedPostsDictionary(savedPosts: SavedPost[]) {
        const subreddits = new Dictionary<string, SavedPost>();
        for (const post of savedPosts) {
            subreddits.addOrUpdate(post.data.subreddit, post);
        }
        this.savedPosts = subreddits;
    }
}
