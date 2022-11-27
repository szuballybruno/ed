import { ContainerType, GetSingleContainerType } from './XMapperTypes';
import { XMappingsBuilder } from './XMappingsBuilder';

export class XMapper<TServices extends any[], TContainer extends ContainerType> {

    constructor(private _builder: XMappingsBuilder<TServices>, private _services: TServices) {

    }

    mapTo<TTarget>(classType: { new(): TTarget }, params: GetSingleContainerType<TContainer, TTarget>['2']) {

        const mapping = this
            ._builder
            .mappings
            .filter(x => x[0].name === classType.name)[0] ?? null;

        if (!mapping)
            throw new Error(`Mapping is missing for target type: ${classType.name}!`);

        const mappingFn = mapping[1];

        return mappingFn(this._services)(...(params as any)) as any as GetSingleContainerType<TContainer, TTarget>['1'];
    }
}