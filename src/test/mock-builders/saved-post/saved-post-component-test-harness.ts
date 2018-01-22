import { SavedPost } from '../../../app/saved-posts/saved-post';
import { TestUtilities } from '../../test-helpers/test-utilities';
import { SavedPostComponent } from '../../../app/saved-posts/saved-post.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

export class SavedPostComponentTestHarness {

    private _savedPost: SavedPost;

    buildFixture(): ComponentFixture<SavedPostComponent> {
        const fixture = TestBed.createComponent(SavedPostComponent);
        fixture.detectChanges();
        return fixture;
    }

    buildParentFixture(): ComponentFixture<SavedPostParentComponent> {
        const fixture = TestBed.createComponent(SavedPostParentComponent);
        fixture.componentInstance.post = this._savedPost;
        fixture.detectChanges();
        return fixture;
    }

    withPost(savedPost: SavedPost): SavedPostComponentTestHarness {
        this._savedPost = savedPost;
        return this;
    }
}

@Component({
    selector: 'app-saved-post-component',
    template: '<app-saved-post-component [post]="{{post}}"></app-saved-post-component>'
})
export class SavedPostParentComponent {
    public post: SavedPost;
}

