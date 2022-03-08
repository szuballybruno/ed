export const extensions = true;

declare global {

    interface Array<T> {

        remove(func: (item: T) => boolean): Array<T>;
        orderBy(func: (item: T) => number | string | Date): Array<T>;
        groupBy(func: (item: T) => any): Grouping<T>[];
        any(func?: (item: T) => boolean): boolean;
        all(func: (item: T) => boolean): boolean;
        findLastIndex(func: (item: T) => boolean): number | null;
        single(func: (item: T) => boolean): T;
        first(func?: (item: T) => boolean): T;
        last(func: (item: T) => boolean): T;
        firstOrNull(func?: (item: T) => boolean): T | null;
        count(func: (item: T) => boolean): number;
    }

    interface Date {
        addDays(days: number): Date;
    }
}

export type Grouping<T> = {
    key: any,
    items: T[],
    first: T
}

Date.prototype.addDays = function (days: number) {

    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Array.prototype.groupBy = function <T>(func: (item: T) => any) {

    const groups = [] as Grouping<T>[];

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
                    })
            }
        });

    return groups;
}

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
}

Array.prototype.last = function <T>(func: (item: T) => T) {

    const filtered = this.filter(func);

    if (filtered.length === 0)
        throw new Error("Last operaion found no matching elements!");

    return filtered[filtered.length - 1];
}

Array.prototype.first = function <T>(func?: (item: T) => boolean) {

    if (!func)
        func = (x: T) => true;

    const filtered = this.filter(func);

    if (filtered.length === 0)
        throw new Error("First operaion found no matching elements!");

    return filtered[0];
}

Array.prototype.single = function <T>(func: (item: T) => T) {

    const filtered = this.filter(func);

    if (filtered.length === 0)
        throw new Error("Single operaion found no matching elements!");

    if (filtered.length > 1)
        throw new Error("Single operation found more than one matching element!");

    return filtered[0];
}

Array.prototype.findLastIndex = function <T>(func: (item: T) => boolean) {

    const filtered = this.filter(func);

    if (filtered.length === 0)
        return null;

    return filtered.length - 1;
}

Array.prototype.all = function <T>(func: (item: T) => boolean) {

    return !this.some(x => !func(x));
}

Array.prototype.any = function <T>(func?: (item: T) => boolean) {

    if (!func)
        return this.some(x => true);

    return this.some(func);
}

Array.prototype.remove = function <T>(func: (item: T) => boolean) {

    return this.filter(item => !func(item)) as Array<T>
}

Array.prototype.orderBy = function <T>(func: (item: T) => number | string | Date) {

    const sorted = this
        .sort((a, b) => {

            if (func(a) < func(b))
                return -1;

            if (func(a) > func(b))
                return 1;

            return 0;
        });

    return sorted;
}

Array.prototype.count = function <T>(func: (item: T) => boolean): number {

    let count = 0;

    for (let index = 0; index < this.length; index++) {

        const element = this[index];
        const result = func(element);
        if (result)
            count++;
    }

    return count;
}