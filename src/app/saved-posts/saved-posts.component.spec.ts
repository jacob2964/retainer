import { MatExpansionModule } from '@angular/material';
import { Any } from '../../test/test-helpers/any';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPostsComponent } from './saved-posts.component';
import { SavedPostsComponentTestHarness } from 'test/saved-posts/saved-posts-component-test-harness';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TestUtilities } from 'test/test-helpers/test-utilities';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SavedPostsComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatExpansionModule, BrowserAnimationsModule],
            declarations: [SavedPostsComponent]
        });
    });

    it('should create an expansion panel for each subreddit', () => {
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

        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 0, savedPostsComponent)).toEqual('subreddit-1');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 1, savedPostsComponent)).toEqual('subreddit-2');
        expect(TestUtilities.getElementInnerTextFromArray('mat-panel-title', 2, savedPostsComponent)).toEqual('subreddit-3');
    });

    // get this to work
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


    });
});
