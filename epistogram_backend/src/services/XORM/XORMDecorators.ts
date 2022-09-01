import { JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm';
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { XMetadataHandler } from '../../utilities/XMetadata/XMetadataHandler';
import { ClassType } from '../misc/advancedTypes/ClassType';

const IS_DELETED_FLAG_METADATA_KEY = 'IS_DELETED_FLAG_METADATA_KEY';
const X_VIEW_COLUMN_METADATA_KEY = 'X_VIEW_COLUMN_METADATA_KEY';

type CheckType = 'null' | 'bool';
type RelationInputType<TRelationEntity> = (() => ClassType<TRelationEntity>);

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

export const XOneToMany = <TCurrentEntity = never>() => {

    return <TRelationEntity>(
        getRelationEntity: RelationInputType<TRelationEntity>,
        getRelationProp: (relationEntity: TRelationEntity) => Relation<TCurrentEntity> | TCurrentEntity | null): PropertyDecorator => {

        return OneToMany((getRelationEntity) as any, getRelationProp);
    };
};

/**
 * Example of usage:
 * --> XManyToOne<GivenAnswer>()(() => QuestionVersion, x => x.givenAnswers)
 */
export const XManyToOne = <TCurrentEntity = never>() => {

    return <TRelationEntity>(
        getRelationEntity: RelationInputType<TRelationEntity>,
        getRelationProp?: (relationEntity: TRelationEntity) => TCurrentEntity[]): PropertyDecorator => {

        return ManyToOne((getRelationEntity) as any, getRelationProp);
    };
};

export const XJoinColumn = <TCurrentEntity = never>(key: keyof TCurrentEntity) => {

    return JoinColumn({ name: toSQLSnakeCasing(key as string) });
};

export const getXViewColumnNames = <T>(classType: ClassType<T>) => {

    return XMetadataHandler
        .getMetadataProperiesByCode(classType.name, X_VIEW_COLUMN_METADATA_KEY)
        .map(x => x.propName);
};

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