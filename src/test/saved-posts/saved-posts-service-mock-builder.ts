import { Any } from '../any';

export class SavedPostsServiceMockBuilder {

    public build() {
        const savedPostsServiceMock = jasmine.createSpyObj('SavedPostsService', ['']);
        savedPostsServiceMock.redditAuthorizationUrl = Any.string(20);
        return savedPostsServiceMock;
    }
}
