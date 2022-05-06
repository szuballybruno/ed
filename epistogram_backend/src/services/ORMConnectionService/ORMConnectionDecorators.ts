import { ClassType } from '../../models/Types';
import { XMetadataHandler } from '../../utilities/XMetadata/XMetadataHandler';

const IS_DELETED_FLAG_METADATA_KEY = 'IS_DELETED_FLAG_METADATA_KEY';

type CheckType = 'null' | 'bool';

export const IsDeletedFlag = (checkType?: CheckType) => {

    return (prototype: any, propertyKey: string) => {

        const className = prototype.constructor.name;
        const chck: CheckType = checkType
            ? checkType
            : 'null';

        XMetadataHandler.regMetadata(className, propertyKey, IS_DELETED_FLAG_METADATA_KEY, chck);
    };
};

export const getIsDeletedDecoratorPropertyData = <T>(classType: ClassType<T>) => {

    const propName = XMetadataHandler.getPropertyNameByMetadataCode(classType, IS_DELETED_FLAG_METADATA_KEY);
    if (!propName)
        return null;

    const checkType = XMetadataHandler.getMetadata(classType.name, propName as string, IS_DELETED_FLAG_METADATA_KEY) as CheckType;

    return {
        propName,
        checkType
    };
};