import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Retainer';

  // Ran into some real trouble with the spacing on this url!
  protected authorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=upw3i_YafZpoXw&response_type=code&state=string_of_random
  &redirect_uri=http://localhost:4200/posts&duration=temporary&scope=history identity`;
}
