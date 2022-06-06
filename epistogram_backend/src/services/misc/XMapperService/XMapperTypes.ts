import { FunctionSignatureAnyArgs } from '../advancedTypes/FunctionSignature';

export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
}

type Filter<TContainer extends [any, ...any], TSearch> = {
    [K in keyof TContainer]: TContainer[K] extends TSearch ? TContainer[K] : undefined;
}

export type MappingType<TObject, TMapFn extends FunctionSignatureAnyArgs<any>> = [TObject, Parameters<ReturnType<TMapFn>>];

export type MappingFunctionType<TServices extends any[], TObject> = (services: TServices) => (...args: [...any]) => TObject;

export type GetParameters<T extends [any, ...any], S> = Exclude<Filter<T, [S, any]>[number], undefined>;

export type ConstrainKeys<T, C> = {
    [K in keyof T]: C;
}