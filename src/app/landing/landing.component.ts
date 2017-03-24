import { Component, OnInit } from '@angular/core';
import { SavedPostsService } from '../saved-posts/saved-posts.service';

@Component({
  selector: 'app-landing',
  template: `
  <img id="retainer-picture" src="assets/retainer.jpg" />
<div id="get-started-button">
  <a md-raised-button href={{authorizationUrl}}>Get Started</a>
</div>
`,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  protected authorizationUrl;

  constructor(private _savedPostsService: SavedPostsService) { }

  ngOnInit() {
     this.authorizationUrl = this._savedPostsService.redditAuthorizationUrl;
  }
}
