export type OldData<TVersion, TData, TEntity> = {
    oldVersion: TVersion;
    oldData: TData;
    oldEntity: TEntity;
}