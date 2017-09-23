import { SavedPost } from '../../app/saved-posts/saved-post';
import { ActivatedRoute } from '@angular/router';
import { SavedPostsComponent } from '../../app/saved-posts/saved-posts.component';
import { TestBed } from '@angular/core/testing';

export class SavedPostsComponentTestHarness {

    private _activatedRouteMock: any = undefined;

    public get activatedRoute() { return this._activatedRouteMock; }

    public buildFixture() {
        this._activatedRouteMock = this.getActivatedRouteMock();
        const fixture = TestBed
            .overrideComponent(SavedPostsComponent, {
                set: {
                    providers: [
                        { provide: ActivatedRoute, useValue: this._activatedRouteMock },
                    ]
                }
            })
            .createComponent(SavedPostsComponent);
        fixture.detectChanges();
        return fixture;
    }

    private getActivatedRouteMock() {
        if (!this._activatedRouteMock) {
            this._activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
        }
        return this._activatedRouteMock;
    }

    withSavedPosts(savedPosts: SavedPost[]) {
        const activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['']);
        activatedRouteMock.snapshot = { data: { savedPosts: savedPosts }};

        this._activatedRouteMock = activatedRouteMock;
        return this;

    }
}
