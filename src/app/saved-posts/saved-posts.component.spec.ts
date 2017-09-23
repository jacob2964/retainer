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

    it('should get saved posts', () => {
        const expectedSavedPosts = Any.savedPosts();

        const savedPostsComponent = new SavedPostsComponentTestHarness()
            .withSavedPosts(expectedSavedPosts)
            .buildFixture();

        const instance = savedPostsComponent.componentInstance;

        expect(instance.savedPosts).toEqual(expectedSavedPosts);
    });
});
