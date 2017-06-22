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

    private _doesStateMatch = true;
    public savedPosts: SavedPost[];
    public get doesStateMatch() { return this._doesStateMatch; }

    constructor(private _activatedRoute: ActivatedRoute, private _redditConnectionService: RedditConnectionService) { }

    ngOnInit() {
        this._redditConnectionService.getUserPosts(this._activatedRoute.snapshot.queryParams['code'])
            .subscribe(posts => console.log(posts));
    }
}
