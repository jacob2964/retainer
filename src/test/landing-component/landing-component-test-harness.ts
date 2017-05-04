import { SavedPostsService } from '../../app/saved-posts/saved-posts.service';
import { LandingComponent } from '../../app/landing/landing.component';
import { TestBed } from '@angular/core/testing';
import { Any } from '../test-helpers/any';

export class LandingComponentTestHarness {

    private _savedPostsServiceMock = jasmine.createSpyObj('SavedPostsService', ['getRedditAuthorizationUrl']);
    public get savedPostsService() { return this._savedPostsServiceMock; };

    public buildFixture() {
        this._savedPostsServiceMock.getRedditAuthorizationUrl.and.returnValue(Any.url());
        const fixture = TestBed
        .overrideComponent(LandingComponent, {
            set: {
                providers: [{provide: SavedPostsService, useValue: this._savedPostsServiceMock}]
            }
        })
        .createComponent(LandingComponent);
        fixture.detectChanges();
        return fixture;
    }
}
