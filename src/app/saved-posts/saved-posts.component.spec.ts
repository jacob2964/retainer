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

    fit('should show saved posts content if the url state matches', () => {
        const testHarness = new SavedPostsComponentTestHarness();
        const fixture = testHarness.buildFixture();
        const localStorageMock = jasmine.createSpyObj('localStorage', ['getItem']);
        const expectedState = Any.stateString(10);
        localStorageMock.getItem.and.returnValue(expectedState);
        testHarness.activatedRoute.params = Observable.of({ 'state': expectedState });
        console.log(fixture.nativeElement);
    });

    it('should show an error if the url state does not match', () => {
        const fixture = new SavedPostsComponentTestHarness().buildFixture();
        const expectedState = Any.stateString(20);
    });
});
