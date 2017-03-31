import { Any } from '../test/test-helpers/any';
import { RandomService } from './random.service';

describe('Random service', () => {
    it('should generate a random state string of the provided length', () => {
        const service = new RandomService();
        const expectedLength = Any.int(10, 50);
        const stateString = service.generateStateString(expectedLength);

        expect(stateString.length).toEqual(expectedLength);
    });

    it('should only contain alphanumeric characters', () => {
        const alphanumbericCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const service = new RandomService();
        const stateString = service.generateStateString(5);

        expect(alphanumbericCharacters.includes(stateString[0])).toBeTruthy();
        expect(alphanumbericCharacters.includes(stateString[1])).toBeTruthy();
        expect(alphanumbericCharacters.includes(stateString[2])).toBeTruthy();
        expect(alphanumbericCharacters.includes(stateString[3])).toBeTruthy();
        expect(alphanumbericCharacters.includes(stateString[4])).toBeTruthy();
    });
});
