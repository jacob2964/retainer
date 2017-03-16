import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SavedPostsService } from './saved-posts/saved-posts.service';
import { SavedPostsComponent } from './saved-posts/saved-posts.component';

const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'saved-posts', component: SavedPostsComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: LandingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SavedPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SavedPostsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
