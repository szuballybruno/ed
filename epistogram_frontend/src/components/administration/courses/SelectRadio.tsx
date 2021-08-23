import React from 'react';
import {ListItemWithRadio} from "../universal/selectMultiple/components/ListItemWithRadioButton/ListItemWithRadioButton";
import {SelectMultiple} from "../universal/selectMultiple/SelectMultiple";

export const SelectRadio = (props:  {
    isEditing?: boolean,
    value?: string,
    checked?: boolean,
    radioButtonOnChange: () => void,
    itemValueOnChange: () => void,
    items: any[]
    name: string,
    onClick: () => void,
    title: string
}) => {

    const listItemWithRadio = <ListItemWithRadio name={props.name}
                                                 value={props.value}
                                                 itemValueOnChange={props.itemValueOnChange}
                                                 radioButtonOnChange={props.radioButtonOnChange}/>


    return <SelectMultiple listItem={listItemWithRadio}
                           items={props.items}
                           onClick={props.onClick}
                           title={props.title} />

};