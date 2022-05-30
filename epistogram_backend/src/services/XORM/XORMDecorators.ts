import { ClassType } from '../misc/advancedTypes/ClassType';
import { XMetadataHandler } from '../../utilities/XMetadata/XMetadataHandler';

const IS_DELETED_FLAG_METADATA_KEY = 'IS_DELETED_FLAG_METADATA_KEY';
const X_VIEW_COLUMN_METADATA_KEY = 'X_VIEW_COLUMN_METADATA_KEY';

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

export const XViewColumn = () => {

    return (prototype: any, propertyKey: string) => {

        const className = prototype.constructor.name;

        XMetadataHandler
            .regMetadata(className, propertyKey, X_VIEW_COLUMN_METADATA_KEY);
    };
};

export const getXViewColumnNames = <T>(classType: ClassType<T>) => {

    return XMetadataHandler
        .getMetadataProperiesByCode(classType.name, X_VIEW_COLUMN_METADATA_KEY)
        .map(x => x.propName);
}

export const getIsDeletedDecoratorPropertyData = <T>(classType: ClassType<T>) => {

    const propName = XMetadataHandler
        .getSinglePropertyNameByMetadataCode(classType, IS_DELETED_FLAG_METADATA_KEY);

    if (!propName)
        return null;

    const checkType = XMetadataHandler
        .getMetadata(classType.name, propName as string, IS_DELETED_FLAG_METADATA_KEY) as CheckType;

    return {
        propName,
        checkType
    };
};