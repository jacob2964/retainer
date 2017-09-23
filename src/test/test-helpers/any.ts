import { SavedPost } from '../../app/saved-posts/saved-post';
export class Any {
    // source: http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
    public static string(length: number, charMask = 'aA#!'): string {
        let mask = '';
        if (charMask.indexOf('a') > -1) {
            mask += 'abcdefghijklmnopqrstuvwxyz';
        }
        if (charMask.indexOf('A') > -1) {
            mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (charMask.indexOf('#') > -1) {
            mask += '0123456789';
        }
        if (charMask.indexOf('!') > -1) {
            mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        }
        let result = '';
        for (let i = length; i > 0; --i) {
            result += mask[Math.floor(Math.random() * mask.length)];
        }
        return result;
    }

    public static int(min = 0, max = 1000): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static url() {
        return this.string(10, 'a') + '.com';
    }

    public static collectionOfType(item: () => any, size = 3): any[] {
        const collection: any[] = [];
        for (let i = 0; i < size; i++) {
            collection.push(item());
        }
        return collection;
    }

    public static stateString(length: number): string {
        return this.alphaNumericString(length);
    }

    public static alphaNumericString(length: number = 10): string {
        return this.string(length, 'aA#');
    }

    public static undefinedOrString(): string {
        if (this.bool()) {
            return this.alphaNumericString(5);
        }
        return undefined;
    }

    public static bool(): boolean {
        const num = Any.int(0, 1000) % 2;

        return num === 1;
    }

    public static savedPost(): SavedPost {
        return {
            kind: 't1',
            data: {
                subreddit: Any.alphaNumericString(5),
                link_title: Any.alphaNumericString(5),
                link_permalink: Any.alphaNumericString(5),
                created: Any.dateUnixUTC()
            }
        };
    }

    public static savedPosts(size = 3): SavedPost[] {
        return Any.collectionOfType(Any.savedPost, size);
    }

    public static dateUTC(): Date {
        const month = Any.int(1, 12);
        const day = Any.int(1, 28);
        const year = Any.int(2000, 3000);
        const hour = Any.int(0, 23);
        const minute = Any.int(0, 59);
        const second = Any.int(0, 59);

        const date = new Date(year, month, day, hour, minute, second);

        return date;
    }

    public static dateUnixUTC() {
        return Any.dateUTC().getTime() / 1000.0;
    }
}
