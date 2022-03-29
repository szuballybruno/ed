import { FieldMutation } from "./FieldMutation"
import { MutationActionType } from "./MutationActionType"

export type Mutation<TMutatee, TKey> = {
    key: TKey,
    action: MutationActionType,
    fieldMutators: FieldMutation<TMutatee, any>[]
}