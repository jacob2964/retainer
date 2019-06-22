import { MatInputModule } from '@angular/material/input';
import { SavedPostComponent } from './saved-post.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Any } from '../../test/test-helpers/any';
import { TestBed } from '@angular/core/testing';
import { SavedPostsComponent } from './saved-posts.component';
import { SavedPostsComponentTestHarness } from 'test/saved-posts/saved-posts-component-test-harness';
import { TestUtilities } from 'test/test-helpers/test-utilities';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SavedPostComponentTestHarness } from 'test/mock-builders/saved-post/saved-post-component-test-harness';

describe('SavedPostsComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                BrowserAnimationsModule,
                MatInputModule, FormsModule
            ],
            declarations: [SavedPostsComponent, SavedPostComponent]
        });
    });

    it('should create an expansion panel with the subreddit name for each subreddit', () => {
        const savedPosts = Any.savedPosts(6);
        savedPosts[0].data.subreddit = 'subreddit-1';
        savedPosts[1].data.subreddit = 'subreddit-2';
        savedPosts[2].data.subreddit = 'subreddit-2';
        savedPosts[3].data.subreddit = 'subreddit-3';
        savedPosts[4].data.subreddit = 'subreddit-3';
        savedPosts[5].data.subreddit = 'subreddit-3';

        const savedPostsComponent = new SavedPostsComponentTestHarness()
            .withSavedPosts(savedPosts)
            .buildFixture();

        const matExpansionPanels = savedPostsComponent.debugElement.queryAll(c => c.name === 'mat-expansion-panel');

        expect(matExpansionPanels.length).toEqual(3);
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 0, savedPostsComponent)).toEqual('subreddit-1');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 1, savedPostsComponent)).toEqual('subreddit-2');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 2, savedPostsComponent)).toEqual('subreddit-3');
    });

    it('should filter out subreddits by filter value', () => {
        const savedPosts = Any.savedPosts(4);
        savedPosts[0].data.subreddit = 'a';
        savedPosts[1].data.subreddit = 'ab';
        savedPosts[2].data.subreddit = 'bc';
        savedPosts[3].data.subreddit = 'cd';

        const savedPostsComponent = new SavedPostsComponentTestHarness()
            .withSavedPosts(savedPosts)
            .buildFixture();

        savedPostsComponent.componentInstance.subredditFilter = 'c';
        savedPostsComponent.detectChanges();

        const matExpansionPanels = savedPostsComponent.debugElement.queryAll(c => c.name === 'mat-expansion-panel');

        expect(matExpansionPanels.length).toEqual(2);
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 0, savedPostsComponent)).toEqual('bc');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 1, savedPostsComponent)).toEqual('cd');
    });

    it('should group posts together by subreddit', () => {
        const savedPosts = Any.savedPosts(6);
        savedPosts[0].data.subreddit = 'subreddit-1';
        savedPosts[1].data.subreddit = 'subreddit-1';
        savedPosts[2].data.subreddit = 'subreddit-1';
        savedPosts[3].data.subreddit = 'subreddit-2';
        savedPosts[4].data.subreddit = 'subreddit-2';
        savedPosts[5].data.subreddit = 'subreddit-2';

        const savedPostsComponent = new SavedPostsComponentTestHarness()
            .withSavedPosts(savedPosts)
            .buildFixture();

        const matExpansionPanels = savedPostsComponent.debugElement.queryAll(c => c.name === 'mat-expansion-panel');
        const savedPostComponentsGroup1 = matExpansionPanels[0].queryAll(c => c.name === 'app-saved-post-component');
        const savedPostComponentsGroup2 = matExpansionPanels[1].queryAll(c => c.name === 'app-saved-post-component');

        expect(savedPostComponentsGroup1[0].componentInstance.post).toEqual(savedPosts[0]);
        expect(savedPostComponentsGroup1[1].componentInstance.post).toEqual(savedPosts[1]);
        expect(savedPostComponentsGroup1[2].componentInstance.post).toEqual(savedPosts[2]);
        expect(savedPostComponentsGroup2[0].componentInstance.post).toEqual(savedPosts[3]);
        expect(savedPostComponentsGroup2[1].componentInstance.post).toEqual(savedPosts[4]);
        expect(savedPostComponentsGroup2[2].componentInstance.post).toEqual(savedPosts[5]);
    });

    it('should sort subreddits in alphabetical order', () => {
        const savedPosts = Any.savedPosts(4);
        savedPosts[0].data.subreddit = 'c';
        savedPosts[1].data.subreddit = '1';
        savedPosts[2].data.subreddit = 'a';
        savedPosts[3].data.subreddit = 'b';

        const savedPostsComponent = new SavedPostsComponentTestHarness()
            .withSavedPosts(savedPosts)
            .buildFixture();

        const matExpansionPanels = savedPostsComponent.debugElement.queryAll(c => c.name === 'mat-expansion-panel');

        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 0, savedPostsComponent)).toEqual('1');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 1, savedPostsComponent)).toEqual('a');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 2, savedPostsComponent)).toEqual('b');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 3, savedPostsComponent)).toEqual('c');
    });
});
