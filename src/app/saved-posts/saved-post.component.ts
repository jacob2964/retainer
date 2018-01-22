import { SavedPost } from './saved-post';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-saved-post-component',
    templateUrl: './saved-post.component.html',
    styleUrls: ['./saved-post.component.css']
})

export class SavedPostComponent {
    @Input() post: SavedPost;
}