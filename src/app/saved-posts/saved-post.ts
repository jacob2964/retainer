export class SavedPost {
    kind: string;
    data: {
        subreddit?: string,
        // kind: type t1. Why did reddit name these two properties differently for the different kinds?
        link_title?: string,
        // kind: type t3.
        title?: string,
        link_permalink?: string,
        created?: number
    };
}