
// type SingleKey<TType, TKeyName extends string> = {
//     [K in keyof TType as TKeyName]: TType[K];
// }

export type FilterKeys<TType extends [any, ...any], TAllowed> = {
    [K in keyof TType]: TType[K] extends TAllowed ? TType[K] : never;
}

export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
}