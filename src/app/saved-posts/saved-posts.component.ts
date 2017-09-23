import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RedditConnectionService } from 'app/reddit-connection.service';
import { SavedPost } from 'app/saved-posts/saved-post';

@Component({
    selector: 'app-saved-posts',
    templateUrl: './saved-posts.component.html',
    styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {

    public savedPosts: SavedPost[];

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.savedPosts = this._activatedRoute.snapshot.data.savedPosts;
    }
}
