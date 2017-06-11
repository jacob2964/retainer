import { SavedPostsResolver } from './saved-posts-resolver';
import { SavedPostsComponent } from '../saved-posts/saved-posts.component';
import { LandingComponent } from '../landing/landing.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'saved-posts', component: SavedPostsComponent, resolve: { savedPosts: SavedPostsResolver } },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: LandingComponent }
];
