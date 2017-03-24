import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1 routerLink="/landing">{{title}}</h1>
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Retainer';
}
