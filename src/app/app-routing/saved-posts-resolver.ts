// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { RedditConnectionService } from 'app/reddit-connection.service';
// import { SavedPost } from 'app/saved-posts/saved-post';

// @Injectable()
// export class SavedPostsResolver implements Resolve<SavedPost> {

//     constructor(private _redditConnectionService: RedditConnectionService) { }
//     resolve(activatedRoute: ActivatedRouteSnapshot) {
//         const doesStateMatch = activatedRoute.queryParams['state'] === localStorage.getItem('state');
//         if (doesStateMatch) {
//             this._redditConnectionService.getAuthorizationTokenWithCode(activatedRoute.queryParams['code']);

//         }
//     }
// }
