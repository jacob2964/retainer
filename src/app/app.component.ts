import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'Retainer';
    public isLoading: boolean;

    constructor(private router: Router) {
        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }

    private navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.isLoading = true;
        }

        if (event instanceof NavigationEnd) {
            this.isLoading = false;
        }

        if (event instanceof NavigationCancel) {
            this.isLoading = false;
        }
        if (event instanceof NavigationError) {
            this.isLoading = false;
        }
    }
}
