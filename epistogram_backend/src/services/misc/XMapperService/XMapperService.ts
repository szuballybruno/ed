import { ClassType } from "../advancedTypes/ClassType";
import { FilterKeys, GetParameters, MappingType } from "./XMapperTypes";

const mappings: [ClassType<any>, (...args: any[]) => any][] = [];

export class XMapper<TContainer extends [any, ...any]> {

    constructor() {

    }

    mapTo<T>(classType: ClassType<T>, params: GetParameters<TContainer, T>['1']) {

        const w = mappings
            .single(x => x[0].name === classType.name);

        return w[1](...(params as any));
    }
}

export const addMapping = <TObject, TMapFn extends (...args: any[]) => TObject>(obj: ClassType<TObject>, fn: TMapFn): MappingType<TObject, TMapFn> => {

    mappings.push([obj, fn]);

    return null as any;
}