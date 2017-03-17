import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from '../landing/landing.component';
import { SavedPostsComponent } from '../saved-posts/saved-posts.component';

const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'saved-posts', component: SavedPostsComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
