import 'reflect-metadata';
import { getKeys } from '../../shared/logic/sharedLogic';

const IS_DELETED_FLAG_METADATA_KEY = 'IS_DELETED_FLAG_METADATA_KEY';

type CheckType = 'null' | 'bool';

export const IsDeletedFlag = (checkType?: CheckType) => {

    return (prototype: any, propertyKey: string) => {

        const chck: CheckType = checkType
            ? checkType
            : 'null';

        Reflect.defineMetadata(IS_DELETED_FLAG_METADATA_KEY, chck, prototype, propertyKey);
    };
};

export const getIsDeletedDecoratorPropertyData = <T>(classType: { new(): T }) => {

    const instance = instatiate(classType);

    const propName = getKeys(instance)
        .firstOrNull(propertyKey => {

            const hasMetadata = Reflect.hasMetadata(IS_DELETED_FLAG_METADATA_KEY, instance, propertyKey as string);
            return hasMetadata;
        });

    if (!propName)
        return null;

    const checkType = Reflect.getMetadata(IS_DELETED_FLAG_METADATA_KEY, instance, propName as string) as CheckType;

    return {
        propName,
        checkType
    };
};

export const instatiate = <T>(classType: { new(): T }) => {

    return new classType();
};