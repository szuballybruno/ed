import { Id } from "@episto/commontypes";

export type OldData<TVersion, TData, TEntity> = {
    oldVersion: TVersion;
    oldData: TData;
    oldEntity: TEntity;
}

export type UserLagbehindStatType = {
    userId: Id<'User'>,
    productivityPercentage: number,
    invertedRelativeUserPaceDiff: number | null
}