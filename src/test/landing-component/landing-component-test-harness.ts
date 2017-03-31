import { SavedPostsService } from '../../app/saved-posts/saved-posts.service';
import { LandingComponent } from '../../app/landing/landing.component';
import { TestBed } from '@angular/core/testing';
import { Any } from '../test-helpers/any';

export class LandingComponentTestHarness {

    private _mockSavedPostsService = jasmine.createSpyObj('SavedPostsService', ['getRedditAuthorizationUrl']);
    public get savedPostsService() {
        return this._mockSavedPostsService;
    };

    public buildFixture() {
        this._mockSavedPostsService.getRedditAuthorizationUrl.and.returnValue(Any.url());
        const fixture = TestBed
        .overrideComponent(LandingComponent, {
            set: {
                providers: [{provide: SavedPostsService, useValue: this._mockSavedPostsService}]
            }
        })
        .createComponent(LandingComponent);
        fixture.detectChanges();
        return fixture;
    }
}
