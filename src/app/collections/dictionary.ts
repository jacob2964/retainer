export class Dictionary<TKey extends number | string, TValue> {
    private _items: { [index: string]: TValue } = {};
    private _keys: TKey[] = [];
    private _values: TValue[] = [];

    public get keys(): TKey[] {
        return this._keys;
    }

    public get values(): TValue[] {
        return this._values;
    }

    public get count(): number {
        return this._keys.length;
    }

    constructor(init?: { key: TKey; value: TValue; }[]) {
        if (init) {
            for (let x = 0; x < init.length; x++) {
                let k = init[x].key.toString();
                this._items[k] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
    }

    public addOrUpdate(key: TKey, value: TValue): void {
        if (this.containsKey(key)) {
            const index = this._keys.indexOf(key, 0);
            this._keys[index] = key;
            this._values[index] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }

        this._items[key.toString()] = value;
    }

    public remove(key: TKey): void {
        const index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this._items[key.toString()];
    }

    public containsKey(key: TKey): boolean {
        if (typeof this._items[key.toString()] === 'undefined') {
            return false;
        }

        return this._items.hasOwnProperty(key.toString());
    }

    public getValue(key: TKey): TValue {
        return this._items[key.toString()];
    }

    public clear(): void {
        this._keys = [];
        this._values = [];
        this._items = {};
    }
}
