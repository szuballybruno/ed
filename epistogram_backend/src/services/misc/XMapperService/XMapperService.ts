import { ClassType } from '../advancedTypes/ClassType';
import { ContainerItemType, ContainerType, GetSingleContainerType, MappingFunctionType } from './XMapperTypes';

export class XMapper<TServices extends any[], TContainer extends ContainerType> {

    constructor(private _builder: XMappingsBuilder<TServices>, private _services: TServices) {

    }

    mapTo<TTarget>(classType: ClassType<TTarget>, params: GetSingleContainerType<TContainer, TTarget>['2']) {

        const w = this._builder
            .mappings
            .single(x => x[0].name === classType.name);

        const mappingFn = w[1];

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