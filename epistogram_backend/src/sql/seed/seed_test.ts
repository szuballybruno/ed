
export type PropConstraintType<TObj, TProp> = {
    [K in keyof TObj]: TProp;
};

export type NoComplexTypes<TObj> = {
    [TKey in keyof TObj as TObj[TKey] extends (string | number | boolean | undefined | null) ? TKey : never]: TObj[TKey]
};

const constraintFn = <T>() => <TRe extends PropConstraintType<TRe, T>>(obj: TRe): PropConstraintType<TRe, T> => {

    return obj;
};

export const getSeedList = <TEntity>() => {

    type SeedType = Omit<NoComplexTypes<TEntity>, 'id'>;

    return <TData extends PropConstraintType<TData, SeedType>>(data: TData) => {

        const ret = constraintFn<SeedType>()(data);

        Object.values(ret)
            .forEach((val, index) => (val as any)['id'] = index + 1);

        return ret as any as PropConstraintType<TData, NoComplexTypes<TEntity>>;
    };
};