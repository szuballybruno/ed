import { ClassType } from '../advancedTypes/ClassType';
import { ContainerItemType, ContainerType, GetSingleContainerType, MappingFunctionType } from './XMapperTypes';

export class XMapper<TServices extends any[], TContainer extends ContainerType> {

    constructor(private _builder: XMappingsBuilder<TServices>, private _services: TServices) {

    }

    mapTo<TTarget>(classType: ClassType<TTarget>, params: GetSingleContainerType<TContainer, TTarget>['2']) {

        const mapping = this
            ._builder
            .mappings
            .firstOrNull(x => x[0].name === classType.name);

        if (!mapping)
            throw new Error(`Mapping is missing for target type: ${classType.name}!`);

        const mappingFn = mapping[1];

        return mappingFn(this._services)(...(params as any)) as any as GetSingleContainerType<TContainer, TTarget>['1'];
    }
}

export class XMappingsBuilder<TServices extends any[]> {

    mappings: [ClassType<any>, MappingFunctionType<TServices, any>][] = [];

    addMapping<TObject, TMapFn extends MappingFunctionType<TServices, TObject>>(obj: ClassType<TObject>, fn: TMapFn) {

        // register function
        this.mappings
            .push([obj, fn]);

        // return null as any as Exclude<Parameters<TMapFn>, [UrlService]>;
        return null as any as ContainerItemType<TObject, TObject, TMapFn>;
    }

    addArrayMapping<TObject, TMapFn extends MappingFunctionType<TServices, TObject[]>>(obj: ClassType<TObject>, fn: TMapFn) {

        // register function
        this.mappings
            .push([obj, fn]);

        // return null as any as Exclude<Parameters<TMapFn>, [UrlService]>;
        return null as any as ContainerItemType<TObject, TObject[], TMapFn>;
    }
}