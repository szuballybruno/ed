
export type PropConstraintType<TObj, TProp> = {
    [K in keyof TObj]: TProp;
};

export type NoIdType<T> = Omit<NoComplexTypes<T>, 'id'>;

export type NoComplexTypes<TObj> = {
    [TKey in keyof TObj as TObj[TKey] extends (string | number | boolean | undefined | null) ? TKey : never]: TObj[TKey]
};

export type InsertEntity<T> = NoIdType<NoComplexTypes<T>>;

export const constraintFn = <T>() => <TRe extends PropConstraintType<TRe, T>>(obj: TRe): PropConstraintType<TRe, T> => {

    return obj;
};

export const instatiateInsertEntity = <T>(entity: InsertEntity<T>) => entity as T;