import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Any } from '../test/test-helpers/any';
import { RedditConnectionService } from './reddit-connection.service';
import { RandomServiceMockBuilder } from 'test/mock-builders/random-service-mock-builder';
import { RandomService } from 'app/random.service';
import { RetainerConfig } from 'app/retainer-configuration';

describe('Saved Posts Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                RedditConnectionService,
                { provide: RandomService, useValue: new RandomServiceMockBuilder().build() },
            ]
        });
    });

    describe('Get Reddit Authorization Url', () => {
        it('should use a random string for the state in the url', inject([RandomService], (randomService: RandomService) => {
            const expectedStateString = Any.stateString(10);

            const randomServiceMock = new RandomServiceMockBuilder()
                .withGeneratedState(expectedStateString)
                .build();

            const service = new RedditConnectionService(randomServiceMock, undefined);

            expect(service.getRedditAuthorizationUrl()).toContain(expectedStateString);
        }));
    });

    describe('Get Saved Posts For User', () => {
        it('should get an authorization token',
            inject([HttpTestingController, RedditConnectionService],
                (backend: HttpTestingController, service: RedditConnectionService) => {
            const expectedUserToken = Any.alphaNumericString();
            service.getUserPosts(Any.alphaNumericString()).subscribe(/**/);

            const request = backend.expectOne(`${RetainerConfig.redditBaseUrl}api/v1/access_token`);
            request.flush({access_token: expectedUserToken});

            expect(service.token).toEqual(expectedUserToken);
        }));

        it('should get the username for the authenticated user',
            inject([HttpTestingController, RedditConnectionService],
                (backend: HttpTestingController, service: RedditConnectionService) => {
            const expectedUsername = Any.alphaNumericString();

            service.getUserPosts(Any.alphaNumericString()).subscribe(/**/);

            const tokenRequest = backend.expectOne(`${RetainerConfig.redditBaseUrl}api/v1/access_token`);
            tokenRequest.flush({});

            const usernameRequest = backend.expectOne(`${RetainerConfig.redditOauthUrl}api/v1/me`);
            usernameRequest.flush({name: expectedUsername});

            expect(service.username).toEqual(expectedUsername);
        }));

        it('should use a token to make the request for a username', inject([HttpTestingController, RedditConnectionService],
            (backend: HttpTestingController, service: RedditConnectionService) => {
            const token = Any.alphaNumericString();

            service.getUserPosts(Any.alphaNumericString()).subscribe(/**/);

            const tokenRequest = backend.expectOne(`${RetainerConfig.redditBaseUrl}api/v1/access_token`);
            tokenRequest.flush({access_token: token});

            const usernameRequest = backend.expectOne(`${RetainerConfig.redditOauthUrl}api/v1/me`);
            usernameRequest.flush({});

            expect(usernameRequest.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
        }));

        it('should return the saved posts for a user',
            inject([HttpTestingController, RedditConnectionService], (backend: HttpTestingController, service: RedditConnectionService) => {
            const expectedSavedPosts = Any.savedPosts();
            const username = Any.alphaNumericString();

            let actualUserPosts;
            service.getUserPosts(Any.alphaNumericString()).subscribe(posts => actualUserPosts = posts);

            const tokenRequest = backend.expectOne(`${RetainerConfig.redditBaseUrl}api/v1/access_token`);
            tokenRequest.flush({});

            const usernameRequest = backend.expectOne(`${RetainerConfig.redditOauthUrl}api/v1/me`);
            usernameRequest.flush({name: username});

            const savedPostsRequest = backend.expectOne(`${RetainerConfig.redditOauthUrl}user/${username}/saved`);
            savedPostsRequest.flush({data: {after: undefined, children: expectedSavedPosts}});

            expect(actualUserPosts).toEqual(expectedSavedPosts);
        }));

        it('should make an additional call if the response contains an after value',
            inject([HttpTestingController, RedditConnectionService], (backend: HttpTestingController, service: RedditConnectionService) => {
            service.getUserPosts(Any.alphaNumericString()).subscribe(/**/);
            const username = Any.alphaNumericString();

            const tokenRequest = backend.expectOne(`${RetainerConfig.redditBaseUrl}api/v1/access_token`);
            tokenRequest.flush({});

            const usernameRequest = backend.expectOne(`${RetainerConfig.redditOauthUrl}api/v1/me`);
            usernameRequest.flush({name: username});

            const savedPostsRequest1 = backend.expectOne(`${RetainerConfig.redditOauthUrl}user/${username}/saved`);
            const afterValue1 = Any.alphaNumericString();
            savedPostsRequest1.flush({data: {after: afterValue1, children: Any.savedPosts()}});
            const savedPostsRequest2 = backend.expectOne(`${RetainerConfig.redditOauthUrl}user/${username}/saved/?after=${afterValue1}`);
            const afterValue2 = Any.alphaNumericString();
            savedPostsRequest2.flush({data: {after: afterValue2, children: Any.savedPosts()}});
            const savedPostsRequest3 = backend.expectOne(`${RetainerConfig.redditOauthUrl}user/${username}/saved/?after=${afterValue2}`);
            savedPostsRequest3.flush({data: {after: undefined, children: Any.savedPosts()}});

            backend.verify();
        }));
    });
});
