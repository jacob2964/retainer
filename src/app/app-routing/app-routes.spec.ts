import { LandingComponent } from '../landing/landing.component';
import { appRoutes } from './app-routes';

describe('app routes', () => {
    fit('should contain the landing route', () => {
        expect(appRoutes[0].path).toEqual('landing');
        expect(appRoutes[0].component).toEqual(LandingComponent);
    });
});
