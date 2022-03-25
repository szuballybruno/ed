import { useState } from "react"

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

export const useXListMutator = <TMutatee extends Object, TKey>(list: TMutatee[], getCompareKey: (obj: TMutatee) => TKey) => {

    const [mutations, setMutations] = useState<Mutation<TMutatee, TKey>[]>([]);

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

        const mut: Mutation<TMutatee, TKey> = {
            key,
            action: "add",
            propertyMutators: (obj as Object)
                .mapProperties()
                .map(x => ({
                    name: x,
                    value: obj[x]
                } as PropertyMutation<TMutatee>))
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
        .filter(item => mutations
            .none(mut => mut.action === "delete" && mut.key === getCompareKey(item)))
        .concat(mutations
            .filter(mut => mut.action === "add")
            .map(mut => createObj(mut)));

    mutations
        .filter(mut => mut.action === "update")
        .forEach(mut => {

            overrideProps(mutatedData
                .single(item => getCompareKey(item) === mut.key), mut.propertyMutators!);
        });

    return {
        mutate,
        add,
        remove,
        mutatedData
    }
}