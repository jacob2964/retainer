import { Routes } from '@angular/router';

export class RouteVerifier {

    constructor(private _routeConfig: Routes) {

    }

    public verifyRouteIncludesComponent(path: string, component: any) {
        const foundRoute = this._routeConfig.find((a) => a.path === path
            && a.component === component);

        expect(foundRoute).toBeDefined(`expected ${path} route to ${component.name} to exist`);
    }

    public verifyRouteIncludesRedirectTo(path: string, redirectTo: string) {
        const foundRoute = this._routeConfig.find(a => a. path === path
            && a.redirectTo === redirectTo);

        expect(foundRoute).toBeDefined(`expected ${path} route to redirect to ${redirectTo}`);
    }

    public verifyDefaultRouteIncludesComponent(component: any) {
        const foundRoute = this._routeConfig.find(a => a.path === '**'
            && a.component === component);

        expect(foundRoute).toBeDefined(`expected ** route to ${component.name} to exist`);
    }
}
