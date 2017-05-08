import { Any } from '../test/test-helpers/any';
import { TestBed, inject } from '@angular/core/testing';

import { RedditConnectionService } from './reddit-connection.service';
import { RandomServiceMockBuilder } from 'test/mock-builders/random-service-mock-builder';

describe('Saved Posts Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RedditConnectionService]
        });
    });

    it('should use a random string for the state in the url', () => {
       const expectedStateString = Any.stateString(10);

        const randomServiceMock = new RandomServiceMockBuilder()
            .withGeneratedState(expectedStateString)
            .build();

        const service = new RedditConnectionService(randomServiceMock);

        expect(service.getRedditAuthorizationUrl()).toContain(expectedStateString);
    });

    // Continue here...
    fit('should get a reddit authorization token with the url code', () => {
        const randomServiceMock = new RandomServiceMockBuilder()
            .build();
        
        const service = new RedditConnectionService(randomServiceMock);


    });
});
