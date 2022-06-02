import { ClassType } from "../advancedTypes/ClassType";
import { FilterKeys } from "./XMapperTypes";

type GetParams<TContainer extends [any, ...any], TKey> = FilterKeys<TContainer, [TKey, any]>['0']['1'];

export class XMapper<TContainer extends [any, ...any]> {

    constructor(public mappings: TContainer) {

    }

    mapTo<T>(classType: ClassType<T>, ...params: GetParams<TContainer, T>) {

    }
}

export const addMapping = <TObject, TMapFn extends (...args: any[]) => TObject>(obj: { new(): TObject }, fn: TMapFn): [TObject, Parameters<TMapFn>] => {

}