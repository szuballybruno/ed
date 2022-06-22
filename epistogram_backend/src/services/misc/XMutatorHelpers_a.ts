import { Mutation } from '../../shared/dtos/mutations/Mutation';

const mapMutationToPartialObject = <TMutatee extends Object, TKey extends keyof TMutatee>(mut: Mutation<TMutatee, TKey>): Partial<TMutatee> => {

    const obj = {} as Partial<TMutatee>;

    mut
        .fieldMutators
        .forEach(x => obj[x.field] = x.value);

    return obj;
};

const anyField = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TKey extends keyof TMutatee, TValue extends TMutatee[TKey]>(key: TKey, value: TValue) => {

        return mutation
            .fieldMutators
            .some(fm => fm.field === key && fm.value === value)
    };
};

const getFieldValue = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TKey extends keyof TMutatee, TValue extends TMutatee[TKey]>(key: TKey): TValue | null => {

        const field = mutation
            .fieldMutators
            .firstOrNull(fm => fm.field === key);

        return field?.value as TValue ?? null;
    };
};

const getFieldValueOrFail = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TKey extends keyof TMutatee, TValue extends TMutatee[TKey]>(key: TKey): TValue => {

        const fieldValue = getFieldValue(mutation)(key);
        if (!fieldValue)
            throw new Error('Cant find field mutation by key: ' + (key as string));

        return fieldValue as any;
    };
};

export const XMutatorHelpers = {
    mapMutationToPartialObject,
    anyField,
    getFieldValue,
    getFieldValueOrFail
}