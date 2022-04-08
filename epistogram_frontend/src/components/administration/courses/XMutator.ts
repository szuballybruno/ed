import { useForceUpdate } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { FieldMutation } from '../../../shared/dtos/mutations/FieldMutation';
import { Mutation } from '../../../shared/dtos/mutations/Mutation';
import { MutationActionType } from '../../../shared/dtos/mutations/MutationActionType';
import { getKeys } from '../../../shared/logic/sharedLogic';
import { KeyOfType } from '../../../shared/types/advancedTypes';
import { loggingSettings } from '../../../static/Environemnt';

export type OnMutaionHandlerActionType<TMutatee, TKey, TField extends keyof TMutatee> =
    (params: {
        key: TKey,
        field: TField,
        newValue: TMutatee[TField],
        item: TMutatee
    }) => void;

export type OnMutationHandlerType<TMutatee, TKey, TField extends keyof TMutatee> = {
    callback: OnMutaionHandlerActionType<TMutatee, TKey, TField>;
    field?: TField;
    action: MutationActionType;
}

export const useXListMutator = <TMutatee extends Object, TKey>(
    items: TMutatee[],
    getCompareKey: (obj: TMutatee) => TKey,
    keyPropertyName: KeyOfType<TMutatee, TKey>) => {

    const onMutationHandlersRef = useRef<OnMutationHandlerType<TMutatee, TKey, keyof TMutatee>[]>([]);
    const forceUpdate = useForceUpdate();

    const mutRef = useRef<Mutation<TMutatee, TKey>[]>([]);
    const setMutations = useCallback((muts: Mutation<TMutatee, TKey>[]) => {

        mutRef.current = muts;
        forceUpdate();
    }, [forceUpdate]);

    const logEvent = (text: string) => {

        console.log(`MUTATION: ${text}`);
    };

    const getCompareKeyValue = (obj: TMutatee) => {

        const key = getCompareKey(obj);
        if (key === null || key === undefined)
            throw new Error('Can\'t use null or undeined as object key!');

        return key;
    };

    const overrideProps = (obj: any, fieldMutators: FieldMutation<TMutatee, any>[]) => {

        fieldMutators
            .map(x => obj[x.field] = x.value);

        return obj;
    };

    const createObj = (mut: Mutation<TMutatee, TKey>): TMutatee => {

        return overrideProps({} as any, mut.fieldMutators!);
    };

    const mutatedItems = ([...items])
        .concat(mutRef.current
            .filter(mut => mut.action === 'add')
            .map(mut => createObj(mut)))
        .filter(item => !mutRef.current
            .some(mut => mut.action === 'delete' && mut.key === getCompareKeyValue(item)));

    mutRef
        .current
        .filter(mut => mut.action === 'update')
        .forEach(mut => {

            const itemIndex = mutatedItems
                .findIndex(item => getCompareKeyValue(item) === mut.key);

            if (itemIndex === -1)
                return;

            mutatedItems[itemIndex] = overrideProps({
                ...mutatedItems[itemIndex]
            }, mut.fieldMutators);
        });

    const executeMutationHandler = useCallback((opts: {
        key: TKey,
        action: MutationActionType,
        field?: any,
        newValue?: any,
    }) => {

        const { action, key, field, newValue } = opts;

        // get item by key 
        // note that this will still hold the 
        // old reference in mut handler callbacks)
        // so in a delete callback the item will be found 
        const item = mutatedItems
            .single(x => getCompareKey(x) === key);

        onMutationHandlersRef
            .current
            .filter(x => x.action === action)
            .filter(x => !x.field || x.field === field)
            .forEach(x => x.callback({ key, field, newValue, item }));
    }, [mutatedItems]);

    const setCompareKey = (obj: TMutatee, key: TKey) => {

        (obj as any)[keyPropertyName] = key;
    };

    const mutate = useCallback(<TField extends keyof TMutatee>(params: {
        key: TKey,
        field: TField,
        newValue: TMutatee[TField],
        noOnMutationCallback?: boolean
    }) => {

        const { field, key, newValue, noOnMutationCallback } = params;

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        const setMutationsWithCallback = (muts: Mutation<TMutatee, TKey>[]) => {

            setMutations(muts);

            if (!noOnMutationCallback)
                executeMutationHandler({ key, field, newValue, action: 'update' });
        };

        const newMutations = [...mutRef.current];

        const originalItem = items
            .firstOrNull(x => getCompareKey(x) === key);

        // if new mutation value equals to 
        // the original value, remove mutations for field
        if (originalItem && originalItem[field] === newValue) {

            const existingMutation = newMutations
                .filter(x => x.key === key)[0];

            if (!existingMutation)
                return;

            const fieldMut = existingMutation
                .fieldMutators
                .filter(x => x.field === field)[0];

            if (!fieldMut)
                return;

            if (existingMutation.fieldMutators.length === 1) {

                if (loggingSettings.mutations)
                    logEvent(`Removing mutation: ${key}`);

                setMutationsWithCallback(newMutations
                    .filter(x => x.key !== key));
            }
            else {

                existingMutation
                    .fieldMutators = existingMutation
                        .fieldMutators
                        .filter(x => x.field !== field);

                if (loggingSettings.mutations)
                    logEvent(`Removing field mutation: ${key} - ${field}`);

                setMutationsWithCallback(newMutations);
            }

            return;
        }

        const oldMutation = newMutations
            .filter(x => x.key === key)[0];

        if (oldMutation && oldMutation.action === 'delete') {

            console.warn('Tying to mutate an object that hase already been marked as removed.');
            return;
        }

        const mutation: Mutation<TMutatee, TKey> = oldMutation
            ? oldMutation
            : {
                key,
                fieldMutators: [],
                action: 'update'
            };

        // if created new mutation, add it to the mutations 
        if (mutation.fieldMutators.length === 0) {

            if (loggingSettings.mutations)
                logEvent(`Adding new mutation: ${key} - ${field} - ${newValue}`);

            newMutations.push(mutation);
        }

        const propertyMutator = mutation
            .fieldMutators
            .filter(x => x.field === field)[0];

        if (propertyMutator) {

            if (loggingSettings.mutations)
                logEvent(`Updating mutation '${key}' property mutator '${field}' value: ${propertyMutator.value} -> ${newValue}`);

            propertyMutator
                .value = newValue;
        }
        else {

            if (loggingSettings.mutations)
                logEvent(`Mutation '${key}' adding new property mutator '${field}' value: ${newValue}`);

            mutation
                .fieldMutators
                .push({ field, value: newValue });
        }


        setMutationsWithCallback(newMutations);
    }, [items, executeMutationHandler, setMutations]);

    // 
    // FUNCTION: remove an item from the list 
    //
    const remove = useCallback((key: TKey) => {

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        // shallow copy new mutations list,
        // but without mutations related to deleted item
        // so for example 'add' mutations won't be copied over
        // thus the item will not show in the new list
        const newMutations = [...mutRef.current];

        newMutations
            .forEach(mut => {

                if (mut.key !== key)
                    return;

                if (loggingSettings)
                    logEvent(`Removing previous mutation '${mut.action}' of item '${key}', since it's being deleted.`);
            });

        // check if deleted item is one 
        // of the newly added items,
        // if it is there's no need to add a delete mutation, 
        // just to remove the add mutation (which we already did)
        const mutationOfDeletedItem = mutRef
            .current
            .filter(x => x.key === key)[0];

        const isDeletedItemNewlyAdded = mutationOfDeletedItem?.action === 'add';

        // if it's not a newly created item, 
        // add delete mutation 
        if (!isDeletedItemNewlyAdded) {

            if (loggingSettings.mutations)
                logEvent(`Adding new 'delete' mutation Key: ${key}!`);

            const mut: Mutation<TMutatee, TKey> = {
                key,
                action: 'delete',
                fieldMutators: []
            };

            newMutations.push(mut);
        }

        // set new mutations list 
        setMutations(newMutations);

        // exec handler callback
        executeMutationHandler({ key, action: 'delete', });

    }, [executeMutationHandler, setMutations]);

    const add = (key: TKey, obj: Partial<TMutatee>) => {

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        setCompareKey(obj as TMutatee, key);

        const mut: Mutation<TMutatee, TKey> = {
            key,
            action: 'add',
            fieldMutators: getKeys(obj as TMutatee)
                .map((x): FieldMutation<TMutatee, any> => {

                    const newObj = {
                        field: x,
                        value: obj[x]
                    };

                    return newObj;
                })
        };

        setMutations([...mutRef.current, mut]);
    };

    const isMutated = (key: TKey) => {

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        const mut = mutRef
            .current
            .firstOrNull(x => x.key === key);

        return (field: keyof TMutatee) => {

            if (!mut)
                return false;

            if (mut.action === 'add')
                return true;

            return mut
                .fieldMutators
                .some(x => x.field === field);
        };
    };

    const resetMutations = () => {

        setMutations([]);
    };

    const addOnMutationHandlers = (handers: OnMutationHandlerType<TMutatee, TKey, keyof TMutatee>[]) => {

        onMutationHandlersRef
            .current = handers;
    };

    return {
        mutate,
        add,
        remove,
        isMutated,
        resetMutations,
        addOnMutationHandlers,
        mutations: mutRef.current,
        isAnyMutated: mutRef.current.length > 0,
        mutatedData: mutatedItems
    };
};
