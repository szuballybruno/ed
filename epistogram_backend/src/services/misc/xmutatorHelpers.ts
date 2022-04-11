import { Mutation } from '../../shared/dtos/mutations/Mutation';

export const mapMutationToPartialObject = <TMutatee extends Object, TKey extends keyof TMutatee>(
    mut: Mutation<TMutatee, TKey>): Partial<TMutatee> => {

    const obj = {} as Partial<TMutatee>;

    mut
        .fieldMutators
        .forEach(x => obj[x.field] = x.value);

    return obj;
};