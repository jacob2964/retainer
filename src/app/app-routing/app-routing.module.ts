import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routes';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        [{provide: APP_BASE_HREF, useValue: '/'}]
    ]
})
export class AppRoutingModule { }
