
export type PropConstraintType<TObj, TProp> = {
    [K in keyof TObj]: TProp;
};

export type NoIdType<T> = Omit<NoComplexTypes<T>, 'id'>;

export type NoComplexTypes<TObj> = {
    [TKey in keyof TObj as TObj[TKey] extends (string | number | boolean | Date | undefined | null) ? TKey : never]: TObj[TKey]
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

export type VersionMigrationResult = { oldVersionId: number, newVersionId: number };

export const VersionMigrationHelpers = {

    getNewVersionId: (migrations: VersionMigrationResult[], oldVersionId: number) => {

        const asd = migrations
            .firstOrNull(x => x.oldVersionId === oldVersionId);

        if (!asd)
            throw new Error(`Version migrations do not contain migration from old versionId: ${oldVersionId}!`);

        return asd.newVersionId;
    },

    create: (oldVersionIds: number[], newVersionIds: number[]) => {

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
                } as VersionMigrationResult);
            });
    },

    asText: (migrations: VersionMigrationResult[]) => {

        return migrations
            .map(x => `${x.oldVersionId} -> ${x.newVersionId}`)
            .join('\n');
    }
}
