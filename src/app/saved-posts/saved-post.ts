export class SavedPost {
    kind?: string;
    data: {
        id?: string;
        subreddit?: string,
        // kind: type t1. Why did reddit name these two properties differently for the different kinds?
        link_title?: string,
        // kind: type t3.
        title?: string,
        permalink?: string
        created?: number
        thumbnail?: string
    };
}