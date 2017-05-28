import { Any } from 'test/test-helpers/any';

export class RandomServiceMockBuilder {

    private _stateString: string;

    withGeneratedState(generatedState: string) {
        this._stateString = generatedState;
        return this;
    }

    build() {
        const mock = jasmine.createSpyObj('RandomService', ['generateStateString']);
        mock.generateStateString.and.returnValue(this._stateString ?
            this._stateString : Any.stateString(10));
        return mock;
    }
}