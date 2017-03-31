import { SavedPostsComponent } from '../saved-posts/saved-posts.component';
import { LandingComponent } from '../landing/landing.component';
import { appRoutes } from './app-routes';
import { RouteVerifier } from '../../test/test-helpers/route-verifier';

describe('App routes', () => {
    it('should contain the landing route', () => {
        const verifier = new RouteVerifier(appRoutes);

        verifier.verifyRouteIncludesComponent('landing', LandingComponent);
    });

    it('should contain the saved-posts route', () => {
        const verifier = new RouteVerifier(appRoutes);

        verifier.verifyRouteIncludesComponent('saved-posts', SavedPostsComponent);
    });

    it('should redirect to the landing component when the route is empty', () => {
        const verifier = new RouteVerifier(appRoutes);

        verifier.verifyRouteIncludesRedirectTo('', '/landing');
    });

    it('should redirect to the landing component when the route doesn\'t match any known routes', () => {
        const verifier = new RouteVerifier(appRoutes);

        verifier.verifyDefaultRouteIncludesComponent(LandingComponent);
    });
});
