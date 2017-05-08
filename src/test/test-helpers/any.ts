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

    public static stateString(length: number): string {
        return this.alphaNumericString(length);
    }

    public static alphaNumericString(length: number): string {
        return this.string(length, 'aA#');
    }
}
