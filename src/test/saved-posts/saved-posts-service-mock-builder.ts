import { Any } from '../test-helpers/any';

export class SavedPostsServiceMockBuilder {

    public build() {
        const savedPostsServiceMock = jasmine.createSpyObj('SavedPostsService', ['getRedditAuthorizationUrl']);
        savedPostsServiceMock.getRedditAuthorizationUrl.and.returnValue(Any.string(20));
        return savedPostsServiceMock;
    }
}
