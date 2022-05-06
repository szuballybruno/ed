import { ClassType } from '../../models/Types';
import { getKeys, getKeyValues } from '../../shared/logic/sharedLogic';

type MetadataKeysType = {

    // metadata code
    [metadataCodeKey: string]: any;
};

type MetadataPropertiesType = {

    // prop name
    [properyNameKey: string]: MetadataKeysType;
}

type MetadataClassesType = {

    // class name
    [classNameKey: string]: MetadataPropertiesType;
}

const metadatas: MetadataClassesType = {};

const regMetadata = (className: string, propertyName: string, metadataCode: string, data?: any) => {

    if (metadatas[className] === undefined)
        metadatas[className] = {};

    if (metadatas[className][propertyName] === undefined)
        metadatas[className][propertyName] = {};

    if (metadatas[className][propertyName][metadataCode] === undefined)
        metadatas[className][propertyName][metadataCode] = {};

    metadatas[className][propertyName][metadataCode].data = data;
};

const hasMetadata = (className: string, propertyName: string, metadataCode: string) => {

    return metadatas[className][propertyName][metadataCode] !== undefined;
};

const getMetadata = <T = any>(className: string, propertyName: string, metadataCode: string): T => {

    return metadatas[className][propertyName][metadataCode].data;
};

const getMetadataProperies = (className: string) => {

    return getKeys(metadatas[className]) as string[];
};

const getMetadataProperiesByCode = <T = any>(className: string, code: string) => {

    const classMetadata = metadatas[className];
    const propsWithMetadata = getKeys(classMetadata) as string[];

    const props = propsWithMetadata
        .filter(propName => hasMetadata(className, propName, code));

    return props
        .map(x => ({
            propName: x,
            metadata: getMetadata<T>(className, x, code)
        }));
};

const getPropertyNameByMetadataCode = <T>(classType: ClassType<T>, metadataCode: string): keyof T | null => {

    const className = classType.name;

    const propName = getMetadataProperies(className)
        .firstOrNull(propertyKey => {

            return hasMetadata(className, propertyKey, metadataCode);
        });

    return propName as any;
};

export const XMetadataHandler = {
    regMetadata,
    hasMetadata,
    getMetadata,
    getMetadataProperies,
    getPropertyNameByMetadataCode,
    getMetadataProperiesByCode
};