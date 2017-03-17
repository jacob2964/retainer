import { Injectable } from '@angular/core';

@Injectable()
export class SavedPostsService {

  // Ran into some real trouble with the spacing on this multi-line url!
  public savedPostsAuthorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=upw3i_YafZpoXw&response_type=code` +
  `&state=string_of_random&redirect_uri=http://localhost:4200/saved-posts&duration=temporary&scope=history`;
}
