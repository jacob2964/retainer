import { SavedPostsService } from '../app/saved-posts/saved-posts.service';
import { LandingComponent } from '../app/landing/landing.component';
import { TestBed } from '@angular/core/testing';

export class LandingComponentTestHarness {

    private _mockSavedPostsService = jasmine.createSpyObj('SavedPostsService', ['getSavedPosts']);
    public get savedPostsService() {
        return this._mockSavedPostsService;
    };

    public buildFixture() {
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

    public withSavedPosts(post: string) {
        this._mockSavedPostsService.getSavedPosts.and.returnValue(post);
        return this;
    }
}
