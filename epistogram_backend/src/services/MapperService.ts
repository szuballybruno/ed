import { ClassType } from "./misc/advancedTypes/ClassType";

export class MapperService {

    private _mapperFunctions: {
        fromTypeName: string;
        toTypeName: string;
        func: (from: any, params?: any) => any;
    }[];

    constructor() {

        this._mapperFunctions = [];
    }

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

    map<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, fromObj: TFrom, params?: any): TTo {

        const mapping = this._mapperFunctions
            .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

        if (!mapping)
            throw new Error(`Mapping '${fromType.name} -> ${toType.name}' not found!`);

        return mapping.func(fromObj, params);
    }

    mapMany<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, fromObjects: TFrom[]): TTo[] {

        return fromObjects
            .map(x => this.map(fromType, toType, x));
    }
}