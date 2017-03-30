import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { SavedPostsService } from '../saved-posts/saved-posts.service';
import { Any } from '../../test/any';
import { SavedPostsServiceMockBuilder } from '../../test/saved-posts/saved-posts-service-mock-builder';
import { LandingComponentTestHarness } from '../../test/landing-component-test-harness';

fdescribe('LandingComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
    });
  });

  it('should contain a button that redirects a user to the Reddit authorization url', () => {
    const testHarness = new LandingComponentTestHarness();
    const fixture = testHarness.buildFixture();
    const compiled = fixture.debugElement.nativeElement;
    const expectedAuthorizationUrl = testHarness.savedPostsService.redditAuthorizationUrl;
    const link = compiled.querySelector(`a[href='${expectedAuthorizationUrl}']`);
    expect(link).toBeTruthy();
  });
});
