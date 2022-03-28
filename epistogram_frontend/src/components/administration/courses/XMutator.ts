import { useState } from "react"
import { getKeys } from "../../../shared/logic/sharedLogic";
import { KeyOfType } from "../../../shared/types/advancedTypes";

type PropertyMutation<TMutatee> = {
    name: keyof TMutatee,
    value: any
}

type MutationActionType = "delete" | "update" | "add";

type Mutation<TMutatee, TKey> = {
    key: TKey,
    action: MutationActionType,
    propertyMutators?: PropertyMutation<TMutatee>[]
}

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

    const mutate = <TPropertyName extends keyof TMutatee>(key: TKey, propertyName: TPropertyName, newValue: TMutatee[TPropertyName]) => {

        const newMutations = [...mutations];

        // get old or create new mutation
        const mutation: Mutation<TMutatee, TKey> = newMutations
            .filter(x => x.key === key)[0] ?? { key, propertyMutators: [], action: "update" };

        if (mutation.action === "delete" || !mutation.propertyMutators) {

            console.warn("Tying to mutate an object that hase already been marked as removed.");
            return;
        }

        // if created new mutation, add it to the mutations 
        if (mutation.propertyMutators.length === 0)
            newMutations.push(mutation);

        const propertyMutator = mutation
            .propertyMutators
            .filter(x => x.name === propertyName)[0];

        if (propertyMutator) {

            propertyMutator
                .value = newValue;
        }
        else {

            mutation
                .propertyMutators
                .push({ name: propertyName, value: newValue });
        }

        setMutations(newMutations);
    }

    const remove = (key: TKey) => {

        const mut: Mutation<TMutatee, TKey> = {
            key,
            action: "delete"
        }

        setMutations([...mutations, mut]);
    }

    const add = (key: TKey, obj: Partial<TMutatee>) => {

        setCompareKey(obj as TMutatee, key);

        const mut: Mutation<TMutatee, TKey> = {
            key,
            action: "add",
            propertyMutators: getKeys(obj as TMutatee)
                .map((x): PropertyMutation<TMutatee> => {

                    const newObj = {
                        name: x,
                        value: obj[x]
                    };

                    return newObj;
                })
        }

        setMutations([...mutations, mut]);
    }

    const overrideProps = (obj: any, propertyMutators: PropertyMutation<TMutatee>[]) => {

        propertyMutators
            .map(x => obj[x.name] = x.value);

        return obj;
    }

    const createObj = (mut: Mutation<TMutatee, TKey>): TMutatee => {

        return overrideProps({} as any, mut.propertyMutators!);
    }

    const mutatedData = list
        .concat(mutations
            .filter(mut => mut.action === "add")
            .map(mut => createObj(mut)))
        .filter(item => !mutations
            .some(mut => mut.action === "delete" && mut.key === getCompareKeyValue(item)));

    mutations
        .filter(mut => mut.action === "update")
        .forEach(mut => {

            const item = mutatedData
                .firstOrNull(item => getCompareKeyValue(item) === mut.key);

            if (!item)
                return;

            overrideProps(item, mut.propertyMutators!);
        });

    console.log(mutations);

    return {
        mutate,
        add,
        remove,
        mutatedData
    }
}