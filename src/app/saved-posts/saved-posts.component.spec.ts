import { Any } from '../../test/test-helpers/any';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPostsComponent } from './saved-posts.component';
import { SavedPostsComponentTestHarness } from 'test/saved-posts/saved-posts-component-test-harness';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('SavedPostsComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SavedPostsComponent]
        });
    });

    // This test will probably be replaced or improved once I actually have the saved posts
    it('should show saved posts content if the url state matches', () => {
        const expectedState = Any.stateString(10);

        const localStorageMock = spyOn(localStorage, 'getItem').and.callFake(function () {
            return expectedState;
        });

        const fixture = new SavedPostsComponentTestHarness()
            .withMatchingState(expectedState)
            .withLocalStorageMock(localStorageMock)
            .buildFixture();

        expect(localStorage.getItem).toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('#good-state')).toBeTruthy();
    });

    it('should show an error if the url state does not match', () => {
        const fixture = new SavedPostsComponentTestHarness()
            .withUnmatchingState()
            .buildFixture();

        expect(fixture.nativeElement.querySelector('#bad-state')).toBeTruthy();
    });

    it('should use code to retrieve token if state matches', () => {
        const expectedCode = Any.alphaNumericString(10);
        const expectedState = Any.alphaNumericString(10);

        const localStorageMock = spyOn(localStorage, 'getItem').and.callFake(function () {
            return expectedState;
        });

        const testHarness = new SavedPostsComponentTestHarness();

        const fixture = testHarness
            .withMatchingStateAndCode([expectedState, expectedCode])
            .withLocalStorageMock(localStorageMock)
            .buildFixture();

        expect(testHarness.redditConnectionServiceMock.getAuthorizationTokenWithCode).toHaveBeenCalledWith(expectedCode);
    });
});
