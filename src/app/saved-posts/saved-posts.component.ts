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

    public subredditFilter;
    public savedPosts: Dictionary<string, SavedPost[]>;

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
        if ( this.subredditFilter === undefined) {
            return true;
        }
        else if (subredditTitle.toLowerCase().includes(this.subredditFilter.toLowerCase())) {
            return true;
        }
        return false;
    }

    public sortedSubreddits() {
        return this.savedPosts.keys.sort((a, b) => {
            return a.localeCompare(b, 'en', {'sensitivity': 'base'});
        });
    }
}
