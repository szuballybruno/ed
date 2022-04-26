
export type PropConstraintType<TObj, TProp> = {
    [K in keyof TObj]: TProp;
};

export type NoComplexTypes<TObj> = {
    [TKey in keyof TObj as TObj[TKey] extends (string | number | boolean | undefined | null) ? TKey : never]: TObj[TKey]
};

export const constraintFn = <T>() => <TRe extends PropConstraintType<TRe, T>>(obj: TRe): PropConstraintType<TRe, T> => {

    return obj;
};