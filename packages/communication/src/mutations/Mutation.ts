import { FieldMutation } from './FieldMutation';
import { MutationActionType } from './MutationActionType';

export class Mutation<TMutatee, TKeyField extends keyof TMutatee>  {
    key: TMutatee[TKeyField];
    action: MutationActionType;
    fieldMutators: FieldMutation<TMutatee, keyof TMutatee>[];
}