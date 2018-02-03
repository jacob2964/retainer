import {TestUtilities} from '../../test/test-helpers/test-utilities';
import { SavedPostParentComponent, SavedPostComponentTestHarness }
    from '../../test/mock-builders/saved-post/saved-post-component-test-harness';
import { Any } from '../../test/test-helpers/any';
import { SavedPostComponent } from './saved-post.component';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SavedPost } from 'app/saved-posts/saved-post';

describe('Saved post componenet', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SavedPostComponent, SavedPostParentComponent]
        });
    });

    it('should allow the parent component to pass a post into it', () => {
        const expectedSavedPost = Any.savedPost();

        const parentFixture = new SavedPostComponentTestHarness()
            .withPost(expectedSavedPost)
            .buildParentFixture();

        const savedPostInstance = parentFixture.debugElement.query(By.directive(SavedPostComponent))
            .componentInstance as SavedPostComponent;

        expect(savedPostInstance.post.data.title).toEqual(expectedSavedPost.data.title);
        expect(savedPostInstance.post.data.link_title).toEqual(expectedSavedPost.data.link_title);
    });

    it('should display the post title for a text post', () => {
        const expectedSavedPost = Any.savedTextPost();

        const fixture = new SavedPostComponentTestHarness()
            .withPost(expectedSavedPost)
            .buildFixture();

        expect(TestUtilities.getElementInnerText('.post-link', fixture)).toEqual(expectedSavedPost.data.link_title);
    });

    it('should display the post title for a link post', () => {
        const expectedSavedPost = Any.savedLinkPost();

        const fixture = new SavedPostComponentTestHarness()
            .withPost(expectedSavedPost)
            .buildFixture();

        expect(TestUtilities.getElementInnerText('.post-link', fixture)).toEqual(expectedSavedPost.data.title);
    });

    it('should navigate to the reddit post link', () => {
        const expectedSavedPost = Any.savedLinkPost();

        const fixture = new SavedPostComponentTestHarness()
            .withPost(expectedSavedPost)
            .buildFixture();

        const link = TestUtilities.getAttribute('.post-link', 'href', fixture);

        expect(link).toEqual('https://reddit.com' + expectedSavedPost.data.permalink);
    });

    it('should open links in a new tab', () => {
        const fixture = new SavedPostComponentTestHarness()
            .buildFixture();

        const target = TestUtilities.getAttribute('.post-link', 'target', fixture);

        expect(target).toEqual('_blank');
    });
});