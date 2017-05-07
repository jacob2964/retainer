import { Any } from '../../test/test-helpers/any';
import { TestBed, inject } from '@angular/core/testing';

import { RedditConnectionService } from './reddit-connection.service';

describe('Saved Posts Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RedditConnectionService]
        });
    });

    it('should use a random string for the state in the url', () => {
        const mockRandomService = jasmine.createSpyObj('RandomService', ['generateStateString']);
        const randomString = Any.string(10, 'aA#');
        mockRandomService.generateStateString.and.returnValue(randomString);
        const service = new RedditConnectionService(mockRandomService);

        expect(service.getRedditAuthorizationUrl()).toContain(randomString);
    });
});
