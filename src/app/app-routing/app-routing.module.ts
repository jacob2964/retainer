import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from '../landing/landing.component';
import { SavedPostsComponent } from '../saved-posts/saved-posts.component';
import { appRoutes } from './app-routes';

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
