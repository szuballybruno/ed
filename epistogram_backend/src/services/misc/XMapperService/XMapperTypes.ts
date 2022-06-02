
// type SingleKey<TType, TKeyName extends string> = {
//     [K in keyof TType as TKeyName]: TType[K];
// }

export type FilterKeys<TType extends [any, ...any], TAllowed> = {
    [K in keyof TType]: TType[K] extends TAllowed ? TType[K] : never;
}

export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
}

type Filter<TContainer extends [any, ...any], TSearch> = {
    [K in keyof TContainer]: TContainer[K] extends TSearch ? TContainer[K] : undefined;
}

export type MappingType<TObject, TMapFn extends (...args: any[]) => any> = [TObject, Parameters<TMapFn>];

export type GetParameters<T extends [any, ...any], S> = Exclude<Filter<T, [S, any]>[number], undefined>;