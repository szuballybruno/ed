import { ClassType } from "../advancedTypes/ClassType";
import { GetParameters, MappingFunctionType, MappingType } from "./XMapperTypes";

export class XMapper<TServices extends any[], TContainer extends [any, ...any]> {

    constructor(private _builder: XMappingsBuilder<TServices>, private _services: TServices) {

    }

    mapTo<T>(classType: ClassType<T>, params: GetParameters<TContainer, T>['1']) {

        const w = this._builder
            .mappings
            .single(x => x[0].name === classType.name);

        const mappingFn = w[1];

        return mappingFn(this._services)(...(params as any));
    }
}

export class XMappingsBuilder<TServices extends any[]> {

    mappings: [ClassType<any>, MappingFunctionType<TServices, any>][] = [];

    addMapping<TObject, TMapFn extends MappingFunctionType<TServices, TObject>>
        (obj: ClassType<TObject>, fn: TMapFn) {

        // register function
        this.mappings
            .push([obj, fn]);

        // return null as any as Exclude<Parameters<TMapFn>, [UrlService]>;
        return null as any as MappingType<TObject, TMapFn>;
    }
}