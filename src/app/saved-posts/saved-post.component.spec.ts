import { SavedPostComponentTestHarness } from '../../test/mock-builders/saved-post/saved-post-component-test-harness';
import { Any } from '../../test/test-helpers/any';
import { SavedPostComponent } from './saved-post.component';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Saved post componenet', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SavedPostComponent]
        });
    });

    fit('should allow the parent component to pass a post into it', () => {
        const expectedSavedPost = Any.savedPost();

        const parentFixture = new SavedPostComponentTestHarness()
            .withPost(expectedSavedPost)
            .buildParentFixture();

        const savedPostInstance = parentFixture.debugElement.query(By.directive(SavedPostComponent))
            .componentInstance as SavedPostComponent;

        expect(savedPostInstance.post.data.title).toEqual(expectedSavedPost.data.title);
    });
});