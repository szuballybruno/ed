import { Mutation } from '@episto/communication';

const mapMutationToPartialObject = <TMutatee, TKey extends keyof TMutatee>(mut: Mutation<TMutatee, TKey>): Partial<TMutatee> => {

    const obj = {} as Partial<TMutatee>;

    mut
        .fieldMutators
        .forEach(fieldMutator => obj[fieldMutator.field] = fieldMutator.value);

    return obj;
};

const anyField = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TKey extends keyof TMutatee, TValue extends TMutatee[TKey]>(key: TKey, value: TValue) => {

        return mutation
            .fieldMutators
            .some(fm => fm.field === key && fm.value === value);
    };
};

const hasMutationForKey = <TMutatee, TKeyField extends keyof TMutatee>(mutations: Mutation<TMutatee, TKeyField>[]) => {

    return <TKey extends TMutatee[TKeyField]>(key: TKey) => {

        return mutations
            .some(mut => mut.key === key);
    };
};

const hasFieldMutation = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TKey extends keyof TMutatee>(key: TKey): boolean => {

        const field = mutation
            .fieldMutators
            .firstOrNull(fm => fm.field === key);

        return !!field;
    };
};

const getFieldValue = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TValue extends TMutatee[TKey], TKey extends keyof TMutatee = any>(keyOrFn: TKey | ((obj: Partial<TMutatee>) => TValue)): TValue | null => {

        if (typeof keyOrFn === 'function') {

            const obj = mapMutationToPartialObject(mutation);
            const res = keyOrFn(obj);

            return res ?? null;
        }
        else {

            const field = mutation
                .fieldMutators
                .firstOrNull(fm => fm.field === keyOrFn);

            return field?.value as TValue ?? null;
        }
    };
};

const getFieldValueOrFail = <TMutatee, TKeyField extends keyof TMutatee>(mutation: Mutation<TMutatee, TKeyField>) => {

    return <TValue extends TMutatee[TKey], TKey extends keyof TMutatee = any>(keyOrFn: TKey | ((obj: Partial<TMutatee>) => TValue)): TValue => {

        const fieldValue = getFieldValue(mutation)(keyOrFn);
        if (!fieldValue)
            throw new Error(typeof keyOrFn === 'function'
                ? 'Cant find field mutation by function.'
                : 'Cant find field mutation by key: ' + (keyOrFn as string));

        return fieldValue;
    };
};

const filterByFieldMutaitonKey = <TMutatee, TKeyField extends keyof TMutatee>(muts: Mutation<TMutatee, TKeyField>[], field: keyof TMutatee) => {

    return muts
        .filter(mut => mut
            .fieldMutators
            .some(fm => fm.field === field));
};

const filterByFieldMutaitonKeyValue = <TMutatee, TKeyField extends keyof TMutatee, TField extends keyof TMutatee>(
    muts: Mutation<TMutatee, TKeyField>[], field: TField, value: TMutatee[TField]) => {

    return muts
        .filter(mut => mut
            .fieldMutators
            .some(fm => fm.field === field && fm.value === value));
};

export const XMutatorHelpers = {
    mapMutationToPartialObject,
    anyField,
    hasFieldMutation,
    getFieldValue,
    getFieldValueOrFail,
    hasMutationForKey,
    filterByFieldMutaitonKey,
    filterByFieldMutaitonKeyValue
};