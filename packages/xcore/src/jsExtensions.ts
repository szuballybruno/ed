export const initJsExtensions = () => 1;

declare global {

    interface Array<T> {

        remove(func: (item: T) => boolean): Array<T>;
        orderBy(func: (item: T) => number | string | Date): Array<T>;
        groupBy<TKey>(func: (item: T) => TKey): Grouping<T, TKey>[];
        isDistinctBy<TKey>(func: (item: T) => TKey): boolean;
        any(funcOrItem?: T | ((item: T) => boolean)): boolean;
        none(func?: (item: T) => boolean): boolean;
        all(func: (item: T) => boolean): boolean;
        findLastIndex(func: (item: T) => boolean): number | null;
        single(func?: (item: T) => boolean): T;
        singleIndex(func?: (item: T) => boolean): number;
        firstOrNullIndex(func?: (item: T) => boolean): number;
        byIndex(index: number): T;
        byIndexOrNull(index: number): T | null;
        first(func?: (item: T) => boolean): T;
        last(func?: (item: T) => boolean): T;
        lastOrNull(func?: (item: T) => boolean): T;
        firstOrNull(func?: (item: T) => boolean): T | null;
        count(func: (item: T) => boolean): number;
        insert(index: number, newItem: T): Array<T>;
        each(func: (item: T) => void): Array<T>;
    }

    interface Date {
        addDays(days: number): Date;
    }

    interface String {
        trimChar(char: string): string;
    }
}

export type Grouping<TItem, TKey> = {
    key: TKey,
    items: TItem[],
    first: TItem
}

String.prototype.trimChar = function (char: string) {

    return this.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '');
};

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days: number) {

    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Array.prototype.insert = function <T>(index: number, newItem: T) {

    return [
        // part of the array before the specified index
        ...this.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...this.slice(index)
    ];
};

// eslint-disable-next-line no-extend-native
Array.prototype.groupBy = function <T, TKey>(func: (item: T) => TKey) {

    const groups = [] as Grouping<T, TKey>[];

    this
        .forEach(item => {

            const key = func(item);
            const currentGroup = groups
                .filter(x => x.key === key)[0];
            const existingKey = !!currentGroup;

            if (existingKey) {

                currentGroup.items.push(item);
            }
            else {

                groups
                    .push({
                        key: key,
                        items: [item],
                        first: item
                    });
            }
        });

    return groups;
};

// eslint-disable-next-line no-extend-native
Array.prototype.isDistinctBy = function <T, TKey>(func: (item: T) => TKey) {

    return !this
        .groupBy(func)
        .some(x => x.items.length > 1);
};

// eslint-disable-next-line no-extend-native
Array.prototype.firstOrNull = function <T>(func?: (item: T) => boolean) {

    if (!func)
        func = (x: T) => true;

    const filtered = this.filter(func);
    const first = filtered[0];

    if (first === undefined)
        return null;

    if (first === null)
        return null;

    return first;
};

// eslint-disable-next-line no-extend-native
Array.prototype.lastOrNull = function <T>(func?: (item: T) => boolean) {

    if (!func)
        func = (x: T) => true;

    const filtered = this.filter(func);
    const last = filtered[filtered.length - 1];

    if (last === undefined)
        return null;

    if (last === null)
        return null;

    return last;
};

// eslint-disable-next-line no-extend-native
Array.prototype.last = function <T>(fn?: (item: T) => T) {

    const func = fn ? fn : () => true;

    const filtered = this.filter(func);

    if (filtered.length === 0)
        throw new Error('Last operaion found no matching elements!');

    return filtered[filtered.length - 1];
};

// eslint-disable-next-line no-extend-native
Array.prototype.first = function <T>(func?: (item: T) => boolean) {

    if (!func)
        func = (x: T) => true;

    const filtered = this.filter(func);

    if (filtered.length === 0)
        throw new Error('First operaion found no matching elements!');

    return filtered[0];
};

// eslint-disable-next-line no-extend-native
Array.prototype.single = function <T>(func?: (item: T) => T) {

    const filtered = this.filter(func ?? (() => true));

    if (filtered.length === 0)
        throw new Error('Single operaion found no matching elements!');

    if (filtered.length > 1)
        throw new Error('Single operation found more than one matching element!');

    return filtered[0];
};

// eslint-disable-next-line no-extend-native
Array.prototype.singleIndex = function <T>(func: (item: T) => boolean) {

    const indices: number[] = [];

    for (let index = 0; index < this.length; index++) {

        const element = this[index];

        if (!func(element))
            continue;

        indices.push(index);
    }

    if (indices.length === 0)
        throw new Error('Single operaion found no matching elements!');

    if (indices.length > 1)
        throw new Error('Single operation found more than one matching element!');

    return indices[0];
};

// eslint-disable-next-line no-extend-native
Array.prototype.firstOrNullIndex = function <T>(func: (item: T) => boolean) {

    const indices: number[] = [];

    for (let index = 0; index < this.length; index++) {

        const element = this[index];

        if (!func(element))
            continue;

        indices.push(index);
    }

    return indices[0] ?? null;
};

// eslint-disable-next-line no-extend-native
Array.prototype.byIndexOrNull = function <T>(index: number) {

    const item = this[index];
    if (item === undefined)
        return null;

    return item;
};

// eslint-disable-next-line no-extend-native
Array.prototype.byIndex = function <T>(index: number) {

    if (index >= this.length || index < 0)
        throw new Error(`Index (${index}) is out of array bounds (0 - ${this.length})!`);

    const item = this[index];
    if (item === undefined)
        throw new Error('Item is undefined!');

    return item;
};

// eslint-disable-next-line no-extend-native
Array.prototype.findLastIndex = function <T>(func: (item: T) => boolean) {

    const filtered = this.filter(func);

    if (filtered.length === 0)
        return null;

    return filtered.length - 1;
};

// eslint-disable-next-line no-extend-native
Array.prototype.all = function <T>(func: (item: T) => boolean) {

    return !this.some(x => !func(x));
};

// eslint-disable-next-line no-extend-native
Array.prototype.any = function <T>(funcOrItem?: T | ((item: T) => boolean)) {

    if (!funcOrItem)
        return this.some(x => true);

    if (typeof funcOrItem === 'function')
        return this.some(funcOrItem as any);

    return this.some(x => x === funcOrItem);
};

// eslint-disable-next-line no-extend-native
Array.prototype.none = function <T>(func?: (item: T) => boolean) {

    if (!func)
        return this.length === 0;

    return !this.some(func);
};

// eslint-disable-next-line no-extend-native
Array.prototype.remove = function <T>(func: (item: T) => boolean) {

    return this.filter(item => !func(item)) as Array<T>;
};

// eslint-disable-next-line no-extend-native
Array.prototype.orderBy = function <T>(func: (item: T) => number | string | Date) {

    const sorted = [...this]
        .sort((a, b) => {

            if (func(a) < func(b))
                return -1;

            if (func(a) > func(b))
                return 1;

            return 0;
        });

    return sorted;
};

// eslint-disable-next-line no-extend-native
Array.prototype.count = function <T>(func: (item: T) => boolean): number {

    let count = 0;

    for (let index = 0; index < this.length; index++) {

        const element = this[index];
        const result = func(element);
        if (result)
            count++;
    }

    return count;
};

// eslint-disable-next-line no-extend-native
Array.prototype.each = function <T>(func: (item: T) => void): T[] {

    for (let index = 0; index < this.length; index++) {

        const element = this[index];
        func(element);
    }

    return this;
};