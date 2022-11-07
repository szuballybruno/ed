export type FieldMutation<TMutatee, TField extends keyof TMutatee> = {
    field: TField,
    value: TMutatee[TField]
}
