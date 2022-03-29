import { useState } from "react"
import { FieldMutation } from "../../../shared/dtos/mutations/FieldMutation";
import { Mutation } from "../../../shared/dtos/mutations/Mutation";
import { getKeys } from "../../../shared/logic/sharedLogic";
import { KeyOfType } from "../../../shared/types/advancedTypes";

export const useXListMutator = <TMutatee extends Object, TKey>(
    list: TMutatee[],
    getCompareKey: (obj: TMutatee) => TKey,
    keyPropertyName: KeyOfType<TMutatee, TKey>) => {

    const [mutations, setMutations] = useState<Mutation<TMutatee, TKey>[]>([]);

    const getCompareKeyValue = (obj: TMutatee) => {

        const key = getCompareKey(obj);
        if (key === null || key === undefined)
            throw new Error("Can't use null or undeined as object key!");

        return key;
    }

    const setCompareKey = (obj: TMutatee, key: TKey) => {

        (obj as any)[keyPropertyName] = key;
    }

    const mutate = <TField extends keyof TMutatee>(key: TKey, field: TField, newValue: TMutatee[TField]) => {

        const newMutations = [...mutations];

        const originalItem = list
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

                setMutations(newMutations
                    .filter(x => x.key !== key));
            }
            else {

                existingMutation
                    .fieldMutators = existingMutation
                        .fieldMutators
                        .filter(x => x.field !== field);

                setMutations(newMutations);
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

        setMutations(newMutations);
    }

    const remove = (key: TKey) => {


        const newList = [...mutations
            .filter(x => x.key !== key)];

        if (mutations.filter(x => x.key === key)[0]?.action !== "add") {

            const mut: Mutation<TMutatee, TKey> = {
                key,
                action: "delete",
                fieldMutators: []
            }

            newList.push(mut);
        }

        setMutations(newList);
    }

    const add = (key: TKey, obj: Partial<TMutatee>) => {

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
        }

        setMutations([...mutations, mut]);
    }

    const isMutated = (key: TKey) => {

        const mut = mutations
            .firstOrNull(x => x.key === key);

        return (field: keyof TMutatee) => {

            if (!mut)
                return false;

            if (mut.action === "add")
                return true;

            return mut
                .fieldMutators
                .some(x => x.field === field);
        }
    }

    const resetMutations = () => {

        setMutations([]);
    }

    const overrideProps = (obj: any, fieldMutators: FieldMutation<TMutatee, any>[]) => {

        fieldMutators
            .map(x => obj[x.field] = x.value);

        return obj;
    }

    const createObj = (mut: Mutation<TMutatee, TKey>): TMutatee => {

        return overrideProps({} as any, mut.fieldMutators!);
    }

    const mutatedData = ([...list])
        .concat(mutations
            .filter(mut => mut.action === "add")
            .map(mut => createObj(mut)))
        .filter(item => !mutations
            .some(mut => mut.action === "delete" && mut.key === getCompareKeyValue(item)));

    mutations
        .filter(mut => mut.action === "update")
        .forEach(mut => {

            const itemIndex = mutatedData
                .findIndex(item => getCompareKeyValue(item) === mut.key);

            if (itemIndex === -1)
                return;

            mutatedData[itemIndex] = overrideProps({
                ...mutatedData[itemIndex]
            }, mut.fieldMutators);
        });

    // console.log(mutations);

    return {
        mutate,
        add,
        remove,
        isMutated,
        resetMutations,
        mutations,
        isAnyMutated: mutations.length > 0,
        mutatedData
    }
}