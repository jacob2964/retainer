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
        const localStorageMock = jasmine.createSpyObj('localStorage', ['getItem']);
        const expectedState = Any.stateString(10);
        localStorageMock.getItem.and.returnValue(expectedState);

        const fixture = new SavedPostsComponentTestHarness()
            .withMatchingState(expectedState)
            .buildFixture();

        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('#good-state'));
    });

    it('should show an error if the url state does not match', () => {
        const localStorageMock = jasmine.createSpyObj('localStorage', ['getItem']);
        localStorageMock.getItem.and.returnValue(Any.stateString(10));

        const fixture = new SavedPostsComponentTestHarness()
            .withUnmatchingState()
            .buildFixture();

        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('#bad-state'));
    });

    // Come back to this
    it('should use code to retrieve token if state matches', () => {
        const expectedCode = Any.alphaNumericString(10);
        const testHarness = new SavedPostsComponentTestHarness();

        const fixture = testHarness
            .withCode(expectedCode)
            .buildFixture();

        expect(testHarness.redditConnectionServiceMock.getAuthorizationTokenWithCode).toHaveBeenCalledWith(expectedCode);
    });

});
