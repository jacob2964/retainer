import { Any } from '../../test/test-helpers/any';
import { SavedPostsResolver } from './saved-posts-resolver';
import { SavedPostsResolverTestHarness } from 'test/saved-posts/saved-posts-resolver-test-harness';

describe('Saved posts resolver', () => {

    it('should get user posts if the url state matches', () => {
        const savedPosts = Any.savedPosts();

        const resolver = new SavedPostsResolverTestHarness()
            .withGoodState()
            .withSavedPosts(savedPosts)
            .build();

        const actualPosts = resolver.resolve();

        expect(actualPosts).toEqual(savedPosts);
    });

    it('should return an empty array if the state does not match', () => {
        const resolver = new SavedPostsResolverTestHarness()
            .withBadState()
            .build();

        const actualPosts = resolver.resolve();

        expect(actualPosts).toEqual([]);
    });
});