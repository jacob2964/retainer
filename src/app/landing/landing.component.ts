import { Component, OnInit } from '@angular/core';
import { SavedPostsService } from '../saved-posts/saved-posts.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  protected authorizationUrl = this._savedPostsService.savedPostsAuthorizationUrl;

  constructor(private _savedPostsService: SavedPostsService) { }
}
