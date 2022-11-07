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

type VersionMigrationResult<TId extends String> = {
    oldVersionId: Id<TId>,
    newVersionId: Id<TId>,
    slug: string
};

export class VersionMigrationContainer<TId extends String>  {

    private _migrations: VersionMigrationResult<TId>[];

    constructor(
        private _oldVersionIds: Id<TId>[],
        private _newVersionIds: Id<TId>[],
        private _slugs: string[]) {

        this
            ._newVersionIds
            .forEach(newVersionId => {

                if (newVersionId === null || newVersionId === undefined)
                    throw new Error('Version migration result cannot contain null or undefined!');
            });

        this
            ._oldVersionIds
            .forEach(oldVersionId => {

                if (oldVersionId === null || oldVersionId === undefined)
                    throw new Error('Version migration result cannot contain null or undefined!');
            });

        this._migrations = this
            ._oldVersionIds
            .map((oldVersionId, index) => ({
                oldVersionId,
                newVersionId: this._newVersionIds[index],
                slug: this._slugs[index]
            } as VersionMigrationResult<TId>));
    }

    getNewVersionId(oldVersionId: Id<TId>): Id<TId> {

        const asd = this._migrations
            .firstOrNull(x => x.oldVersionId === oldVersionId);

        if (!asd)
            throw new Error(`Version migrations do not contain migration from old versionId: ${oldVersionId}!`);

        return asd.newVersionId;
    }

    asText() {

        return this._migrations
            .map(x => `${x.oldVersionId} -> ${x.newVersionId}`)
            .join('\n');
    }

    getMigrations() {

        return this._migrations;
    }

    getSlug(newVersionId: any) {

        return this
            ._migrations
            .single(x => x.newVersionId === newVersionId)
            .slug;
    }
}
