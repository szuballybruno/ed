import { ClassType } from '../../services/misc/advancedTypes/ClassType';
import { getKeys, getKeyValues } from '../../shared/logic/sharedLogic';

type MetadataType = {
    className: string;
    metadataKey: string;
    propertyName?: string;
    data?: any;
}

const metadatas: MetadataType[] = [];

const _addMetadata = (meta: MetadataType) => {

    metadatas.push(meta);
};

const regMetadata = (className: string, propertyName: string, metadataKey: string, data?: any) => {

    _addMetadata({
        className,
        propertyName,
        metadataKey,
        data
    });
};

const regClassMetadata = (className: string, metadataKey: string, data?: any) => {

    _addMetadata({
        className,
        metadataKey,
        data
    });
};

const getMetadata = (className: string, propertyName: string, metadataCode: string) => {

    return metadatas
        .firstOrNull(x => x.className === className
            && x.propertyName === propertyName
            && x.metadataKey === metadataCode);
};

const hasMetadata = (className: string, propertyName: string, metadataCode: string) => {

    return getMetadata(className, propertyName, metadataCode) !== undefined;
};

const getMetadataData = <T = any>(className: string, propertyName: string, metadataCode: string): T => {

    if (!hasMetadata(className, propertyName, metadataCode))
        throw new Error('Metadata not found!');

    return getMetadata(className, propertyName, metadataCode)!.data;
};

const getMetadataProperies = (className: string, metadataKey: string) => {

    return metadatas
        .filter(x => x.className === className
            && x.propertyName
            && x.metadataKey === metadataKey)
        .map(x => x.propertyName);
};

const getMetadataProperiesByCode = <T = any>(className: string, metadataKey: string) => {

    return metadatas
        .filter(x => x.className === className
            && x.metadataKey === metadataKey
            && x.propertyName)
        .map(x => ({
            propName: x.propertyName!,
            metadata: x.data as T
        }));
};

const getSinglePropertyNameByMetadataCode = <T>(classType: ClassType<T>, metadataCode: string): keyof T | null => {

    const className = classType.name;

    return metadatas
        .filter(x => x.className === className
            && x.metadataKey === metadataCode
            && x.propertyName)
        .single(x => true)
        .propertyName! as keyof T;
};

export const XMetadataHandler = {
    regMetadata,
    regClassMetadata,
    hasMetadata,
    getMetadata: getMetadataData,
    getMetadataProperies,
    getSinglePropertyNameByMetadataCode,
    getMetadataProperiesByCode
};