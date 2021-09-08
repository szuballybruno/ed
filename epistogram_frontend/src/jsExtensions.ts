export { }
declare global {

    interface Array<T> {

        remove(func: (item: T) => boolean): Array<T>;
        orderBy(func: (item: T) => number | string): Array<T>;
        distinct(): Array<T>;
    }
}

Array.prototype.remove = function <T>(func: (item: T) => boolean) {

    return this.filter(item => !func(item)) as Array<T>
}

Array.prototype.orderBy = function <T>(func: (item: T) => number | string) {

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