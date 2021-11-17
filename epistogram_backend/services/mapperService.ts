import { ClassType } from "../models/Types";

const mapperFunctions = [] as {
    fromTypeName: string;
    toTypeName: string;
    func: (from: any) => any;
}[];

export class MapperService {

    addMapperFunction<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, func: (from: TFrom) => TTo) {

        const mapping = mapperFunctions
            .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

        if (mapping)
            throw new Error(`Mapping '${fromType.name}' -> ${toType.name} already exists!`);

        mapperFunctions
            .push({
                fromTypeName: fromType.name,
                toTypeName: toType.name,
                func
            });
    }

    useMapperFunction<TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, fromObj: TFrom): TTo {

        const mapping = mapperFunctions
            .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

        if (!mapping)
            throw new Error(`Mapping '${fromType.name} -> ${toType.name}' not found!`);

        return mapping.func(fromObj);
    }
}