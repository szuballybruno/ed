import { FieldMutation } from "./FieldMutation"
import { MutationActionType } from "./MutationActionType"

export type Mutation<TMutatee, TKeyField extends keyof TMutatee> = {
    key: TMutatee[TKeyField],
    action: MutationActionType,
    fieldMutators: FieldMutation<TMutatee, keyof TMutatee>[]
}