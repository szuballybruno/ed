import { ClassType } from "../advancedTypes/ClassType";
import { FilterKeys, GetParameters, MappingType } from "./XMapperTypes";

export class XMapper<TContainer extends [any, ...any]> {

    constructor(public mappings: TContainer) {

    }

    mapTo<T>(classType: ClassType<T>, ...params: GetParameters<TContainer, T>['1']) {

    }
}

export const addMapping = <TObject, TMapFn extends (...args: any[]) => TObject>(obj: { new(): TObject }, fn: TMapFn): MappingType<TObject, TMapFn> => {

    return [];
}