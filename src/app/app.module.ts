import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RedditConnectionService } from './reddit-connection.service';
import { SavedPostsComponent } from './saved-posts/saved-posts.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RandomService } from './random.service';
import { SavedPostsResolver } from 'app/app-routing/saved-posts-resolver';

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
    providers: [
        RedditConnectionService,
        RandomService,
        SavedPostsResolver
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
