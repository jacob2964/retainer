import { SavedPost } from './saved-post';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-saved-post-component',
    templateUrl: './saved-post.component.html',
    styleUrls: ['./saved-post.component.css']
})

export class SavedPostComponent {
    @Input() post: SavedPost;

    public getPostTitle() {
        return this.post.data.link_title || this.post.data.title;
    }

    public getPostLink() {
        return 'https://reddit.com' + this.post.data.permalink;
    }
}