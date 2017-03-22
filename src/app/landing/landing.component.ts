import { Component, OnInit } from '@angular/core';
import { SavedPostsService } from '../saved-posts/saved-posts.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  protected authorizationUrl;

  constructor(private _savedPostsService: SavedPostsService) { }

  ngOnInit() {
     this.authorizationUrl = this._savedPostsService.savedPostsAuthorizationUrl;
  }
}
