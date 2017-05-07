import { RedditConnectionService } from '../../app/reddit-connection.service';
import { LandingComponent } from '../../app/landing/landing.component';
import { TestBed } from '@angular/core/testing';
import { Any } from '../test-helpers/any';

export class LandingComponentTestHarness {

    private _redditConnectionServiceMock = jasmine.createSpyObj('RedditConnectionService', ['getRedditAuthorizationUrl']);
    public get redditConnectionService() { return this._redditConnectionServiceMock; };

    public buildFixture() {
        this._redditConnectionServiceMock.getRedditAuthorizationUrl.and.returnValue(Any.url());
        const fixture = TestBed
        .overrideComponent(LandingComponent, {
            set: {
                providers: [{provide: RedditConnectionService, useValue: this._redditConnectionServiceMock}]
            }
        })
        .createComponent(LandingComponent);
        fixture.detectChanges();
        return fixture;
    }
}
