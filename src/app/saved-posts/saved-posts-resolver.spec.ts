import { Any } from '../../test/test-helpers/any';
import { SavedPostsResolverTestHarness } from 'test/saved-posts/saved-posts-resolver-test-harness';
import { SavedPost } from './saved-post';

describe('Saved posts resolver', () => {

    it('should get user posts if the url state matches', () => {
        const stateString = Any.alphaNumericString();
        const activatedRouteSnapshotMock = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
        activatedRouteSnapshotMock.queryParams = { state: stateString };
        const savedPosts = Any.savedPosts();

        const resolver = new SavedPostsResolverTestHarness()
            .withGoodState(activatedRouteSnapshotMock)
            .withSavedPosts(savedPosts)
            .build();

        const actualPosts = resolver.resolve(activatedRouteSnapshotMock);

        expect(actualPosts).toEqual(savedPosts);
    });

    it('should return an empty array if the state does not match', () => {
        const activatedRouteSnapshotMock = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
        activatedRouteSnapshotMock.queryParams = { state: Any.alphaNumericString() };

        const resolver = new SavedPostsResolverTestHarness()
            .withBadState()
            .build();

        let actualPosts: SavedPost[];
        resolver.resolve(activatedRouteSnapshotMock).subscribe(sp => actualPosts = sp);

        expect(actualPosts).toEqual([]);
    });
});