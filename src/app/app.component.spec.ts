import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterOutletMockComponent } from '../test/router/router-outlet-mock';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, RouterOutletMockComponent],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Retainer'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Retainer');
    });

    it('should render title in a h1 tag', () => {
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
        const app = fixture.debugElement.nativeElement;
        const expectedLandingLink = '/landing';
        const actualLink = app.querySelector(`h1[routerLink='${expectedLandingLink}']`);
        expect(actualLink).toBeTruthy();
    });
});
