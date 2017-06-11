import { Any } from '../test/test-helpers/any';
import { TestBed, inject } from '@angular/core/testing';
import { RedditConnectionService } from './reddit-connection.service';
import { RandomServiceMockBuilder } from 'test/mock-builders/random-service-mock-builder';
import { BaseRequestOptions, Headers, Http, RequestOptions, ResponseOptions, ConnectionBackend, Response } from '@angular/http';
import { RandomService } from 'app/random.service';
import { Observable } from 'rxjs/Observable';
import { RetainerConfig } from 'app/retainer-configuration';
import { MockBackend } from '@angular/http/testing';

describe('Saved Posts Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RedditConnectionService,
                Http,
                { provide: ConnectionBackend, useClass: MockBackend },
                { provide: RandomService, useValue: new RandomServiceMockBuilder().build() },
                { provide: RequestOptions, useClass: BaseRequestOptions },
            ]
        });
    });

    function createService(
        randomServiceMock: RandomService = new RandomServiceMockBuilder().build(),
        httpMock: Http = jasmine.createSpyObj('Http', ['get'])): RedditConnectionService {
        const service = new RedditConnectionService(randomServiceMock, httpMock);
        return service;
    }

    describe('Get Reddit Authorization Url', () => {
        it('should use a random string for the state in the url', () => {
            const expectedStateString = Any.stateString(10);

            const randomServiceMock = new RandomServiceMockBuilder()
                .withGeneratedState(expectedStateString)
                .build();

            const service = createService(randomServiceMock);

            expect(service.getRedditAuthorizationUrl()).toContain(expectedStateString);
        });
    });

    describe('Get Authorization Token With Code', () => {
        it('should get a reddit authorization token with the url code', () => {
            const httpMock = jasmine.createSpyObj('Http', ['post']);
            httpMock.post.and.returnValue(Observable.of(/**/));
            const service = createService(undefined, httpMock);
            const expectedCode = Any.alphaNumericString(5);

            const body = `grant_type=authorization_code&code=${expectedCode}` +
                `&redirect_uri=${RetainerConfig.redirectUrl}saved-posts`;

            const expectedHeaders = new Headers();
            const expectedRequestOptions = new RequestOptions({ headers: expectedHeaders });
            expectedHeaders.append('Authorization', 'Basic dXB3M2lfWWFmWnBvWHc6NzdkMzRocWFSYUpreUxLNno1eGo2NWF4WWRV');
            expectedHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

            service.getAuthorizationTokenWithCode(expectedCode);

            expect(httpMock.post).toHaveBeenCalledWith(`${RetainerConfig.redditBaseUrl}api/v1/access_token`, body, expectedRequestOptions);
        });
    });

    describe('Get Username for Authenticated user', () => {
        it('should store the username of the authenticated user',
            inject([ConnectionBackend, RedditConnectionService], (mockBackend: MockBackend, service: any) => {
            const expectedUsername = Any.alphaNumericString(10);
            const responseOptions = new ResponseOptions({ status: 200, body: JSON.stringify({ name: expectedUsername })});

            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(responseOptions));
            });

            service.getUsernameForAuthenticatedUser(Any.alphaNumericString(10));
            expect(service.username).toEqual(expectedUsername);
        }));
    });

    describe('Get Saved Posts For Authenticated User', () => {
        // it('should store the saved posts of the authenticated user',
        //     inject([ConnectionBackend, RedditConnectionService], (mockBackend: MockBackend, service: any) => {
        //     const expectedUserSavedPosts = Any.savedPosts();
        //     const responseOptions = new ResponseOptions({ status: 200, body: JSON.stringify({ name: expectedUsername })});

        //     mockBackend.connections.subscribe(connection => {
        //         connection.mockRespond(new Response(responseOptions));
        //     });

        //     service.getUsernameForAuthenticatedUser(Any.alphaNumericString(10));
        //     expect(service.username).toEqual(expectedUsername);
        // }));
    });
});
