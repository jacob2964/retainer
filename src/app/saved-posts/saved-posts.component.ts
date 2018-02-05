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

    public savedPosts: Dictionary<string, SavedPost[]>;
    private _filter = 'angular';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        const savedPosts = this._activatedRoute.snapshot.data.savedPosts;
        this.createSavedPostsDictionary(savedPosts);
    }

    private hasImage(post: SavedPost): boolean {
        return post.data.thumbnail !== 'default' && post.data.thumbnail !== 'self';
    }

    private createSavedPostsDictionary(savedPosts: SavedPost[]): void {
        const postsBySubreddit = new Dictionary<string, SavedPost[]>();
        for (const post of savedPosts) {
            if (postsBySubreddit.containsKey(post.data.subreddit)) {
                const savedPostArray = postsBySubreddit.getValue(post.data.subreddit);
                savedPostArray.push(post);
            }
            else {
                postsBySubreddit.addOrUpdate(post.data.subreddit, [post]);
            }
        }
        this.savedPosts = postsBySubreddit;
    }

    private filterSubreddits(subredditTitle: string) {
        if (subredditTitle.toLowerCase().includes(this._filter.toLowerCase())) {
            return true;
        }
        return false;
    }
}
