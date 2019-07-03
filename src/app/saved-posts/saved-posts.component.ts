import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public totalPosts = 0
    public totalSubreddits = 0

    constructor(private _activatedRoute: ActivatedRoute, private _renderer: Renderer2) { }

    ngOnInit() {
        const savedPosts = this._activatedRoute.snapshot.data.savedPosts;
        this.createSavedPostsDictionary(savedPosts);
    }

    private createSavedPostsDictionary(savedPosts: SavedPost[]): void {
        const postsBySubreddit = new Dictionary<string, SavedPost[]>();
        for (const post of savedPosts) {
            this.totalPosts++
            if (postsBySubreddit.containsKey(post.data.subreddit)) {
                const savedPostArray = postsBySubreddit.getValue(post.data.subreddit);
                savedPostArray.push(post);
            } else {
                postsBySubreddit.addOrUpdate(post.data.subreddit, [post]);
                this.totalSubreddits++
            }
        }
        this.savedPosts = postsBySubreddit;
    }

    public filterSubreddits(subredditTitle: string) {
        if (this.subredditFilter === undefined) {
            return true;
        } else if (subredditTitle.toLowerCase().includes(this.subredditFilter.toLowerCase())) {
            return true;
        }
        return false;
    }

    public sortedSubreddits() {
        return this.savedPosts.keys.sort((a, b) => {
            return a.localeCompare(b, 'en', { 'sensitivity': 'base' });
        });
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeyDown(event: KeyboardEvent) {
        if (event.key === 's') {
            const element = this._renderer.selectRootElement('.input-field');

            setTimeout(() => element.focus(), 0);
        }
    }
}
