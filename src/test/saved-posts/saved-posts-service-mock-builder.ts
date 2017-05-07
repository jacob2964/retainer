import { Any } from '../test-helpers/any';

export class RedditConnectionServiceMockBuilder {

    public build() {
        const redditConnectionServiceMock = jasmine.createSpyObj('RedditConnectionService', ['getRedditAuthorizationUrl']);
        redditConnectionServiceMock.getRedditAuthorizationUrl.and.returnValue(Any.string(20));
        return redditConnectionServiceMock;
    }
}
