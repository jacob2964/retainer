import { Injectable } from '@angular/core';
import { RandomService } from '../random';

@Injectable()
export class SavedPostsService {

  private _state: string;

  // Ran into some real trouble with the spacing on this multi-line url!
  public redditAuthorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=upw3i_YafZpoXw&response_type=code` +
  `&state=string_of_random&redirect_uri=http://localhost:4200/saved-posts&duration=temporary&scope=history`;

  public constructor(private _randomService: RandomService) {
    this._state = this._randomService.generateRandomString(20);
  }
}
