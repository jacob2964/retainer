import { Any } from '../test/test-helpers/any';
import { TestBed, inject } from '@angular/core/testing';
import { RedditConnectionService } from './reddit-connection.service';
import { RandomServiceMockBuilder } from 'test/mock-builders/random-service-mock-builder';
import { BaseRequestOptions, Headers, Http, RequestOptions, ResponseOptions, ConnectionBackend, Response } from '@angular/http';
import { RandomService } from 'app/random.service';
import { Observable } from 'rxjs/Observable';
import { RetainerConfig } from 'app/retainer-configuration';
import { MockBackend } from '@angular/http/testing';
import { SavedPost } from 'app/saved-posts/saved-post';

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

    describe('Get Saved Posts For User', () => {
        it('should get an authorization token',
            inject([ConnectionBackend, RedditConnectionService], (mockBackend: MockBackend, service: RedditConnectionService) => {
            const expectedUserToken = Any.alphaNumericString(10);
            const responseOptions = new ResponseOptions({ status: 200, body:
                    JSON.stringify({ access_token: expectedUserToken, data: {after: Any.undefinedOrString, children: []} })});

            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(responseOptions));
            });

            service.getUserPosts(Any.alphaNumericString(10)).subscribe(/**/);

            expect(service.token).toEqual(expectedUserToken);
        }));

        it('should get the username for the authenticated user',
            inject([ConnectionBackend, RedditConnectionService], (mockBackend: MockBackend, service: RedditConnectionService) => {
            const expectedUsername = Any.alphaNumericString(10);
            const responseOptions = new ResponseOptions({ status: 200, body:
                    JSON.stringify({ access_token: Any.alphaNumericString(10),
                            data: {after: Any.undefinedOrString, children: []}, name: expectedUsername })});

            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(responseOptions));
            });

            service.getUserPosts(Any.alphaNumericString(10)).subscribe(/**/);

            expect(service.username).toEqual(expectedUsername);
        }));

        // This test is useless.
        fit('should return the saved posts for a user',
            inject([ConnectionBackend, RedditConnectionService], (mockBackend: MockBackend, service: RedditConnectionService) => {
            const expectedSavedPosts = Any.savedPosts();
            const responseBody = JSON.stringify({
                access_token: Any.alphaNumericString(10),
                data: {after: undefined, children: expectedSavedPosts},
                name: Any.alphaNumericString(10) });
            const responseOptions = new ResponseOptions({ status: 200, body: responseBody });

            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(responseOptions));
            });

            let userPosts;
            service.getUserPosts(Any.alphaNumericString(10)).subscribe(posts => userPosts = posts);

            console.log(userPosts);
            expect(userPosts.data.children).toEqual(expectedSavedPosts);
        }));
    });
});
