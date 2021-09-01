import React from 'react';
import {ListItemWithRadio} from "./selectMultiple/components/ListItemWithRadioButton/ListItemWithRadioButton";
import {SelectMultiple} from "./selectMultiple/SelectMultiple";

export const SelectRadio = (props:  {
    isEditing?: boolean,
    value?: string,
    checked?: boolean,
    radioButtonOnChange: () => void,
    itemValueOnChange: () => void,
    items?: any
    name: string,
    onClick?: () => void,
    title: string
}) => {

    return <SelectMultiple items={props.items}
                           onClick={props.onClick}
                           title={props.title}>
        {!!props.items && props.items.map(item => <ListItemWithRadio radioButtonOnChange={props.radioButtonOnChange} itemValueOnChange={props.itemValueOnChange} name={item.name} value={item.title} />)}

    </SelectMultiple>
};