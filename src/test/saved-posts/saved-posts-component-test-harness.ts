import { RedditConnectionService } from '../../app/reddit-connection.service';
import { SavedPostsComponent } from '../../app/saved-posts/saved-posts.component';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Any } from 'test/test-helpers/any';

export class SavedPostsComponentTestHarness {

    private _activatedRouteMock: any = undefined;
    private _redditConnectionServiceMock: any = undefined;

    public get activatedRoute()
    {
        return this._activatedRouteMock;
    }

    public get redditConnectionServiceMock() {
        return this._redditConnectionServiceMock;
    }

    public buildFixture() {
        this._activatedRouteMock = this.getActivatedRouteMock();
        this._redditConnectionServiceMock = this.getRedditConnectionServiceMock();
        const fixture = TestBed
            .overrideComponent(SavedPostsComponent, {
                set: {
                    providers: [
                        { provide: ActivatedRoute, useValue: this._activatedRouteMock },
                        { provide: RedditConnectionService, useValue: this._redditConnectionServiceMock }
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

    private getRedditConnectionServiceMock() {
        if (!this._redditConnectionServiceMock) {
            this._redditConnectionServiceMock = jasmine.createSpyObj('RedditConnectionService', ['getAuthorizationTokenWithCode']);
        }
        return this._redditConnectionServiceMock;
    }

    withMatchingState(routeParams: any) {
        const activatedRouteMock = new ActivatedRoute();
        activatedRouteMock.queryParams = Observable.of({'state': routeParams});

        this._activatedRouteMock = activatedRouteMock;
        return this;
    }

    withUnmatchingState() {
        const activatedRouteMock = new ActivatedRoute();
        activatedRouteMock.queryParams = Observable.of({'state': Any.stateString(5)});

        this._activatedRouteMock = activatedRouteMock;
        return this;
    }

    withCode(routeParams: any) {
        const activatedRouteMock = new ActivatedRoute();
        activatedRouteMock.queryParams = Observable.of({'code': routeParams});

        this._activatedRouteMock = activatedRouteMock;
        return this;
    }
}
