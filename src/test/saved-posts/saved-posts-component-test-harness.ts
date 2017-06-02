import { RedditConnectionService } from '../../app/reddit-connection.service';
import { SavedPostsComponent } from '../../app/saved-posts/saved-posts.component';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Any } from 'test/test-helpers/any';
import { Http } from '@angular/http';

export class SavedPostsComponentTestHarness {

    private _activatedRouteMock: any = undefined;
    private _redditConnectionServiceMock: any = undefined;
    private _localStorageMock: any = undefined;

    public get activatedRoute() { return this._activatedRouteMock; }
    public get redditConnectionServiceMock() { return this._redditConnectionServiceMock; }
    public get localStorageMock() { return this._localStorageMock; }

    public buildFixture() {
        this._activatedRouteMock = this.getActivatedRouteMock();
        this._redditConnectionServiceMock = this.getRedditConnectionServiceMock();
        this._localStorageMock = this.getLocalStorageMock();
        const fixture = TestBed
            .overrideComponent(SavedPostsComponent, {
                set: {
                    providers: [
                        { provide: ActivatedRoute, useValue: this._activatedRouteMock },
                        { provide: RedditConnectionService, useValue: this._redditConnectionServiceMock },
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

    private getLocalStorageMock() {
        if (!this._localStorageMock) {
            this._localStorageMock = jasmine.createSpyObj('localStorage', ['getItem']);
        }
        return this._localStorageMock;
    }

    withLocalStorageMock(localStorageMock: any) {
        this._localStorageMock = localStorageMock;
        return this;
    }

    withMatchingState(routeParams: any) {
        const activatedRouteMock = new ActivatedRoute();
        activatedRouteMock.queryParams = Observable.of({'state': routeParams});

        this._activatedRouteMock = activatedRouteMock;
        return this;
    }

    withMatchingStateAndCode(routeParams: any) {
        const activatedRouteMock = new ActivatedRoute();
        activatedRouteMock.queryParams = Observable.of({'state': routeParams[0], 'code': routeParams[1]});

        this._activatedRouteMock = activatedRouteMock;
        return this;
    }

    withUnmatchingState() {
        const activatedRouteMock = new ActivatedRoute();
        activatedRouteMock.queryParams = Observable.of({'state': Any.stateString(5)});

        this._activatedRouteMock = activatedRouteMock;
        return this;
    }
}
