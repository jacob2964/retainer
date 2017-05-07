import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { RedditConnectionService } from '../reddit-connection.service';
import { Any } from '../../test/test-helpers/any';
import { RedditConnectionServiceMockBuilder } from '../../test/saved-posts/saved-posts-service-mock-builder';
import { LandingComponentTestHarness } from '../../test/landing-component/landing-component-test-harness';

describe('LandingComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LandingComponent],
        });
    });

    it('should contain a button that redirects a user to the Reddit authorization url', () => {
        const testHarness = new LandingComponentTestHarness();
        const fixture = testHarness.buildFixture();
        const compiled = fixture.debugElement.nativeElement;
        const expectedAuthorizationUrl = testHarness.redditConnectionService.getRedditAuthorizationUrl();
        const link = compiled.querySelector(`a[href='${expectedAuthorizationUrl}']`);
        expect(link).toBeTruthy();
    });
});
