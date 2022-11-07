import { FunctionSignatureAnyArgs } from '../advancedTypes/FunctionSignature';

/**
 * Makes a mutable type out of a readonly one
 */
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
}

/**
 * Type for an array that has at least one element but can have more.
 */
export type ArrayWithAtLeastOneItem<TItem = any> = [TItem, ...TItem[]];

/**
 * Container type - type of the mapper container
 */
export type ContainerType = ArrayWithAtLeastOneItem<ContainerItemType<any, any, any>>;

/**
 * Takes an array touple, and a 'search' type.
 * Replaces non-matching types in the array with undefined. 
 */
type Filter<TContainer extends ContainerType, TSearch> = {
    [K in keyof TContainer]: TContainer[K] extends TSearch ? TSearch extends TContainer[K] ? TContainer[K] : undefined : undefined;
}

/**
 * Takes a 'container' array touple with at least one type in it.
 * Takes a 'search' type.
 * Returns a single type that extends the search type.
 */
type FindSingle<TContainer extends ContainerType, TSearch> = Exclude<Filter<TContainer, TSearch>[number], undefined>

/**
 * Gets a single container type via searching by the 'key' type 
 */
export type GetSingleContainerType<TContainer extends ContainerType, TTypeKey> = FindSingle<TContainer, [TTypeKey, any, any]>;

/**
 * Mapping type, used as container touple items type
 * Has [keyType, returnType, paramsType]
 */
export type ContainerItemType<TTypeKey, TReturn, TMapFn extends FunctionSignatureAnyArgs<any>> = [TTypeKey, TReturn, Parameters<ReturnType<TMapFn>>];

export type MappingFunctionType<TServices extends any[], TObject> = (services: TServices) => (...args: [...any]) => TObject;

export type ConstrainKeys<T, C> = {
    [K in keyof T]: C;
}