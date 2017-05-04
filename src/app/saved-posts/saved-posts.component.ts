import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-saved-posts',
    templateUrl: './saved-posts.component.html',
    styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {

    private _doesStateMatch: boolean;
    public get doesStateMatch() { return this._doesStateMatch; }

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this._activatedRoute.queryParams.subscribe((queryParams: Params) => {
            this._doesStateMatch = queryParams['state'] === localStorage.getItem('state');
        });
    }
}
