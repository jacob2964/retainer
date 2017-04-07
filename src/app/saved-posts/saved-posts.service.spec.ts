import { Any } from '../../test/test-helpers/any';
import { TestBed, inject } from '@angular/core/testing';

import { SavedPostsService } from './saved-posts.service';

describe('Saved Posts Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SavedPostsService]
        });
    });

    it('should use a random string for the state in the url', () => {
        const mockRandomService = jasmine.createSpyObj('RandomService', ['generateStateString']);
        const randomString = Any.string(10, 'aA#');
        mockRandomService.generateStateString.and.returnValue(randomString);
        const service = new SavedPostsService(mockRandomService);

        expect(service.getRedditAuthorizationUrl()).toContain(randomString);
    });
});
