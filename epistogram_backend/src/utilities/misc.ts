
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

export type VersionMigrationResult = { oldVersionId: number, newVersionId: number };

export const VersionMigrationHelpers = {

    getNewVersionId: (migrations: VersionMigrationResult[], oldVersionId: number) => {

        const asd = migrations
            .firstOrNull(x => x.oldVersionId === oldVersionId);

        if (!asd)
            throw new Error(`Module migrations do not contain migration from old moduleVersionId: ${oldVersionId}!`);

        return asd.newVersionId;
    },

    create: (oldVersionIds: number[], newVersionIds: number[]) => {

        return oldVersionIds
            .map((x, i) => ({
                newVersionId: newVersionIds[i],
                oldVersionId: x
            } as VersionMigrationResult));
    }
}
