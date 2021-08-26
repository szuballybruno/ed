import React from "react";

export interface ISelectMultiple {
    title: string
    value?: string
    name?: string
    nameProperty: string
    valueProperty: string
    editingProperty?: string

    inputArray: {[key: string]: any }[],
    editingItems: string[]
    checkedItems?: string[]

    checkBoxOnChange: (e: React.ChangeEvent<any>) => any
    searchOnChange: (e: React.ChangeEvent<any>) => any
    editOnChange?: (e: React.ChangeEvent<any>) => any

    showCheckBox?: boolean
    showDeleteButton?: boolean
    showEditButton?: boolean
    showAdd?: boolean

    selectOne?: boolean

    emptyArrayMessage: string,

    items: any[]
    setItems: () => any
}