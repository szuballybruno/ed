import { useForceUpdate } from "@chakra-ui/react";
import { MutableRefObject, useRef } from "react";
import { FieldMutation } from "../../../shared/dtos/mutations/FieldMutation";
import { Mutation } from "../../../shared/dtos/mutations/Mutation";
import { getKeys } from "../../../shared/logic/sharedLogic";
import { KeyOfType } from "../../../shared/types/advancedTypes";

export type OnMutaionHandlerActionType<TMutatee, TKey, TField extends keyof TMutatee> =
    (params: {
        key: TKey,
        field: TField,
        newValue: TMutatee[TField],
        item: TMutatee
    }) => void;

export type OnMutationHandlerType<TMutatee, TKey, TField extends keyof TMutatee> = {
    action: OnMutaionHandlerActionType<TMutatee, TKey, TField>,
    field: TField
}

export const useXListMutator = <TMutatee extends Object, TKey>(
    items: TMutatee[],
    getCompareKey: (obj: TMutatee) => TKey,
    keyPropertyName: KeyOfType<TMutatee, TKey>,
    onMutationHandlers: MutableRefObject<OnMutationHandlerType<TMutatee, TKey, keyof TMutatee>[]>) => {

    // const [onMutationHandlers, setOnMutationHandlers] = useState<OnMutationHandlerType<TMutatee, TKey, keyof TMutatee>[]>([]);
    // const [mutations, setMutations] = useState<Mutation<TMutatee, TKey>[]>([]);
    const forceUpdate = useForceUpdate();

    const mutRef = useRef<Mutation<TMutatee, TKey>[]>([]);
    const setMutations = (muts: Mutation<TMutatee, TKey>[]) => {

        mutRef.current = muts;
        forceUpdate();
    };

    const getCompareKeyValue = (obj: TMutatee) => {

        const key = getCompareKey(obj);
        if (key === null || key === undefined)
            throw new Error("Can't use null or undeined as object key!");

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
            .filter(mut => mut.action === "add")
            .map(mut => createObj(mut)))
        .filter(item => !mutRef.current
            .some(mut => mut.action === "delete" && mut.key === getCompareKeyValue(item)));

    mutRef
        .current
        .filter(mut => mut.action === "update")
        .forEach(mut => {

            const itemIndex = mutatedItems
                .findIndex(item => getCompareKeyValue(item) === mut.key);

            if (itemIndex === -1)
                return;

            mutatedItems[itemIndex] = overrideProps({
                ...mutatedItems[itemIndex]
            }, mut.fieldMutators);
        });

    // console.log(mutRef.current);

    const executeMutationHandler = (key: TKey, field: any, newValue: any) => {

        onMutationHandlers
            .current
            .filter(x => x.field === field)
            .forEach(x => x.action({ key, field, newValue, item: mutatedItems.single(x => getCompareKey(x) === key) }));
    };

    // const addOnMutationHandler = <TField extends keyof TMutatee>(field: TField, action: OnMutaionHandlerActionType<TMutatee, TKey, TField>) => {

    //     setOnMutationHandlers([...onMutationHandlers.filter(x => x.field !== field), { action: action as any, field }]);
    // }

    const setCompareKey = (obj: TMutatee, key: TKey) => {

        (obj as any)[keyPropertyName] = key;
    };

    const mutate = <TField extends keyof TMutatee>(params: {
        key: TKey,
        field: TField,
        newValue: TMutatee[TField],
        noOnMutationCallback?: boolean
    }) => {

        const { field, key, newValue, noOnMutationCallback } = params;

        if (key === null || key === undefined)
            throw new Error("Mutation error, key is null or undefined!");

        const setMutationsWithCallback = (muts: Mutation<TMutatee, TKey>[]) => {

            setMutations(muts);

            if (!noOnMutationCallback)
                executeMutationHandler(key, field, newValue);
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

                console.log(`Removing mutation: ${key}`);
                setMutationsWithCallback(newMutations
                    .filter(x => x.key !== key));
            }
            else {

                existingMutation
                    .fieldMutators = existingMutation
                        .fieldMutators
                        .filter(x => x.field !== field);

                console.log(`Removing field mutation: ${key} - ${field}`);
                setMutationsWithCallback(newMutations);
            }

            return;
        }

        const oldMutation = newMutations
            .filter(x => x.key === key)[0];

        if (oldMutation && oldMutation.action === "delete") {

            console.warn("Tying to mutate an object that hase already been marked as removed.");
            return;
        }

        const mutation: Mutation<TMutatee, TKey> = oldMutation
            ? oldMutation
            : {
                key,
                fieldMutators: [],
                action: "update"
            };

        // if created new mutation, add it to the mutations 
        if (mutation.fieldMutators.length === 0)
            newMutations.push(mutation);

        const propertyMutator = mutation
            .fieldMutators
            .filter(x => x.field === field)[0];

        if (propertyMutator) {

            propertyMutator
                .value = newValue;
        }
        else {

            mutation
                .fieldMutators
                .push({ field, value: newValue });
        }

        console.log(`Adding new mutation: ${key} - ${field} - ${newValue}`);
        setMutationsWithCallback(newMutations);
    };

    const remove = (key: TKey) => {

        if (key === null || key === undefined)
            throw new Error("Mutation error, key is null or undefined!");

        const newList = [...mutRef.current
            .filter(x => x.key !== key)];

        if (mutRef.current.filter(x => x.key === key)[0]?.action !== "add") {

            const mut: Mutation<TMutatee, TKey> = {
                key,
                action: "delete",
                fieldMutators: []
            };

            newList.push(mut);
        }

        setMutations(newList);
    };

    const add = (key: TKey, obj: Partial<TMutatee>) => {

        if (key === null || key === undefined)
            throw new Error("Mutation error, key is null or undefined!");

        setCompareKey(obj as TMutatee, key);

        const mut: Mutation<TMutatee, TKey> = {
            key,
            action: "add",
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
            throw new Error("Mutation error, key is null or undefined!");

        const mut = mutRef
            .current
            .firstOrNull(x => x.key === key);

        return (field: keyof TMutatee) => {

            if (!mut)
                return false;

            if (mut.action === "add")
                return true;

            return mut
                .fieldMutators
                .some(x => x.field === field);
        };
    };

    const resetMutations = () => {

        setMutations([]);
    };

    return {
        mutate,
        add,
        remove,
        isMutated,
        resetMutations,
        // addOnMutationHandler,
        mutations: mutRef.current,
        isAnyMutated: mutRef.current.length > 0,
        mutatedData: mutatedItems
    };
};
