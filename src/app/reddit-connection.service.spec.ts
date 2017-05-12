import { Any } from '../test/test-helpers/any';
import { TestBed, inject } from '@angular/core/testing';

import { RedditConnectionService } from './reddit-connection.service';
import { RandomServiceMockBuilder } from 'test/mock-builders/random-service-mock-builder';
import { Http } from '@angular/http';
import { RandomService } from 'app/random.service';
import { Observable } from 'rxjs/Observable';

describe('Saved Posts Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RedditConnectionService]
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
        fit('should get a reddit authorization token with the url code', () => {
            const httpMock = jasmine.createSpyObj('Http', ['post']);
            httpMock.post.and.returnValue(Observable.of(/**/));
            const service = createService(undefined, httpMock);
            const expectedCode = Any.alphaNumericString(5);

            const body = `grant_type=authorization_code&code=${expectedCode}` +
                '&redirect_uri=http://localhost:4200/saved-posts';

            service.getAuthorizationTokenWithCode(expectedCode);

            expect(httpMock.post).toHaveBeenCalledWith('https://www.reddit.com/api/v1/access_token', body);
        });
    });
});
