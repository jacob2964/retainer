import { Injectable } from '@angular/core';
import { RandomService } from './random.service';

@Injectable()
export class RedditConnectionService {

    private _state: string;
    public get state(): string {
        return this._state;
    }

    public constructor(private _randomService: RandomService) {
        this._state = this._randomService.generateStateString(20);
     }

    public getRedditAuthorizationUrl(): string {
        localStorage.setItem('state', this._state);
        // Ran into some real trouble with the spacing on this multi-line url!
        return `https://www.reddit.com/api/v1/authorize?client_id=upw3i_YafZpoXw&response_type=code` +
            `&state=${this._state}&redirect_uri=http://localhost:4200/saved-posts&duration=temporary&scope=history`;
    }
}
