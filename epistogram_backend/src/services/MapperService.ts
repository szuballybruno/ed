import { ClassType } from './misc/advancedTypes/ClassType';
import { epistoMappingsBuilder, EpistoMappingsType, initializeMappings } from './misc/mappings';
import { XMapper } from './misc/XMapperService/XMapperService';
import { UrlService } from './UrlService';

export class MapperService extends XMapper<[UrlService], EpistoMappingsType> {

    private _mapperFunctions: {
        fromTypeName: string;
        toTypeName: string;
        func: (from: any, params?: any) => any;
    }[];

    constructor(urlService: UrlService) {

        super(epistoMappingsBuilder, [urlService]);

        this._mapperFunctions = [];

        initializeMappings(urlService.getAssetUrl, this);
    }

    /**
     * @deprecated The method should not be used, see: {@link EpistoMapperService}
     */
    addMap<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, func: (from: TFrom, params?: any) => TTo) {

        const mapping = this._mapperFunctions
            .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

        if (mapping)
            throw new Error(`Mapping '${fromType.name}' -> ${toType.name} already exists!`);

        this._mapperFunctions
            .push({
                fromTypeName: fromType.name,
                toTypeName: toType.name,
                func
            });
    }

    /**
     * @deprecated The method should not be used, see: {@link EpistoMapperService}
     */
    map<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, fromObj: TFrom, params?: any): TTo {

        const mapping = this._mapperFunctions
            .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

        if (!mapping)
            throw new Error(`Mapping '${fromType.name} -> ${toType.name}' not found!`);

        return mapping.func(fromObj, params);
    }

    /**
     * @deprecated The method should not be used, see: {@link EpistoMapperService}
     */
    mapMany<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, fromObjects: TFrom[]): TTo[] {

        return fromObjects
            .map(x => this.map(fromType, toType, x));
    }
}