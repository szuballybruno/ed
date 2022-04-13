import { ClassType } from '../../models/Types';
import { getKeys } from '../../shared/logic/sharedLogic';

const metadatas = {} as any;

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

const getMetadata = (className: string, propertyName: string, metadataCode: string) => {

    return metadatas[className][propertyName][metadataCode].data;
};

const getMetadataProperies = (className: string) => {

    return getKeys(metadatas[className]) as string[];
};

const getFirstOrNullMetadataProperty = <T>(classType: ClassType<T>, metadataCode: string): keyof T | null => {

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
    getFirstOrNullMetadataProperty
};