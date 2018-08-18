import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutletMockComponent } from '../test/router/router-outlet-mock';
import { MatProgressSpinnerModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { SavedPostsComponent } from './saved-posts/saved-posts.component';
import { FormsModule } from '@angular/forms';
import { SavedPostComponent } from './saved-posts/saved-post.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                RouterOutletMockComponent,
                LandingComponent,
                SavedPostComponent,
                SavedPostsComponent],
            imports: [
                MatProgressSpinnerModule,
                FormsModule,
                AppRoutingModule,
                MatInputModule,
                MatExpansionModule]
        });
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Retainer'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const instance = fixture.debugElement.componentInstance;
        expect(instance.title).toEqual('Retainer');
    });

    it('should render title in an h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Retainer');
    });

    it('should contain the router outlet', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const compiled = fixture.debugElement.nativeElement;
        const routerOutletElement = compiled.querySelector('router-outlet');
        expect(routerOutletElement).toBeTruthy();
    });

    it('should redirect the user to the landing page when clicking the title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const instance = fixture.debugElement.nativeElement;
        const expectedLandingLink = '/landing';
        const actualLink = instance.querySelector(`h1[routerLink='${expectedLandingLink}']`);
        expect(actualLink).toBeTruthy();
    });
});
