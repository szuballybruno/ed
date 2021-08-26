export{}
declare global {
    interface Array<T> {
        remove(func: (item: T) => boolean): Array<T>;
    }
}

Array.prototype.remove = function <T> (func: (item: T) => boolean) {

    return this.filter(item => !func(item)) as Array<T>
}