import { Id } from "@episto/x-core";

export type NoIdType<T> = Omit<T, 'id'>;

type AllowedInsertTypes = string | number | boolean | Date | Id<any> | undefined | null;

export type NoComplexTypes<TObject> = {
    [TKey in keyof TObject as TObject[TKey] extends AllowedInsertTypes ? TKey : never]: TObject[TKey]
};

export type InsertEntity<T> = NoIdType<NoComplexTypes<T>>;