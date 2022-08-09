import { Id } from '../shared/types/versionId';

export type PropConstraintType<TObj, TProp> = {
    [K in keyof TObj]: TProp;
};

export type NoIdType<T> = Omit<T, 'id'>;

type AllowedInsertTypes = string | number | boolean | Date | Id<any> | undefined | null;

export type NoComplexTypes<TObject> = {
    [TKey in keyof TObject as TObject[TKey] extends AllowedInsertTypes ? TKey : never]: TObject[TKey]
};

export type InsertEntity<T> = NoIdType<NoComplexTypes<T>>;

export const constraintFn = <TItem, TRootConstraint extends PropConstraintType<TRootConstraint, TItem> = {}>() => {

    return <TObject extends PropConstraintType<TObject, TItem> & TRootConstraint>(obj: TObject): PropConstraintType<TObject, TItem> => {

        return obj;
    };
};

export type KeyofConstrained<TOriginal, TConstraint> = keyof {
    [K in keyof TOriginal as TOriginal[K] extends TConstraint ? K : never]: TOriginal[K];
}

export const instatiateInsertEntity = <T>(entity: InsertEntity<T>) => entity as T;

export type GenericPropNameType<TProperty extends string, TValue> = { [P in TProperty]: TValue }

export type StringKeyof<T> = (keyof T) & string;

export type VersionMigrationResult<TId extends String> = { oldVersionId: Id<TId>, newVersionId: Id<TId> };

export const VersionMigrationHelpers = {

    getNewVersionId: <TId extends String>(migrations: VersionMigrationResult<TId>[], oldVersionId: Id<TId>): Id<TId> => {

        const asd = migrations
            .firstOrNull(x => x.oldVersionId === oldVersionId);

        if (!asd)
            throw new Error(`Version migrations do not contain migration from old versionId: ${oldVersionId}!`);

        return asd.newVersionId;
    },

    create: <TId extends String>(oldVersionIds: Id<TId>[], newVersionIds: Id<TId>[]) => {

        return oldVersionIds
            .map((x, i) => {

                const newVersionId = newVersionIds[i];
                const oldVersionId = x;

                if (newVersionId === null || newVersionId === undefined)
                    throw new Error('Version migration result cannot contain null or undefined!');

                if (oldVersionId === null || oldVersionId === undefined)
                    throw new Error('Version migration result cannot contain null or undefined!');

                return ({
                    newVersionId,
                    oldVersionId
                } as VersionMigrationResult<TId>);
            });
    },

    asText: <TId extends String>(migrations: VersionMigrationResult<TId>[]) => {

        return migrations
            .map(x => `${x.oldVersionId} -> ${x.newVersionId}`)
            .join('\n');
    }
};
