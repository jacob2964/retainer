import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SavedPostsService } from './saved-posts/saved-posts.service';
import { SavedPostsComponent } from './saved-posts/saved-posts.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RandomService } from './random';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SavedPostsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [SavedPostsService, RandomService],
  bootstrap: [AppComponent]
})

export class AppModule { }
