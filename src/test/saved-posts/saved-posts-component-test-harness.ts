import { SavedPostsService } from '../../app/saved-posts/saved-posts.service';
import { SavedPostsComponent } from '../../app/saved-posts/saved-posts.component';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

export class SavedPostsComponentTestHarness {

    private _activatedRouteMock = new ActivatedRoute();
    public get activatedRoute() { return this._activatedRouteMock; }

    public buildFixture() {
        const fixture = TestBed
            .overrideComponent(SavedPostsComponent, {
                set: {
                    providers: [{provide: ActivatedRoute, useValue: this._activatedRouteMock }]
                }
            })
            .createComponent(SavedPostsComponent);
        fixture.detectChanges();
        return fixture;
    }
}