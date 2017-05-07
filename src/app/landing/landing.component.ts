import { Component, OnInit } from '@angular/core';
import { RedditConnectionService } from '../reddit-connection.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    public authorizationUrl;

    constructor(private _redditConnectionService: RedditConnectionService) { }

    ngOnInit() {
        this.authorizationUrl = this._redditConnectionService.getRedditAuthorizationUrl();
    }
}
