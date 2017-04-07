import { SavedPostsService } from './saved-posts.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-saved-posts',
    templateUrl: './saved-posts.component.html',
    styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {

    private _doesStateMatch: boolean;

    constructor(private _savedPostsService: SavedPostsService, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this._activatedRoute.queryParams.subscribe((queryParams: Params) => {
            this._doesStateMatch = queryParams['state'] === this._savedPostsService.state;
        });
    }
}
