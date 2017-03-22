import { TestBed, inject } from '@angular/core/testing';

import { SavedPostsService } from './saved-posts.service';

describe('SavedPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedPostsService]
    });
  });

  it('should ...', inject([SavedPostsService], (service: SavedPostsService) => {
    expect(service).toBeTruthy();
  }));

  it('should use a random string for the state in the url', () => {
    //
  });
});
