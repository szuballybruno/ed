import React from 'react';
import {ListItemWithRadio} from "./selectMultiple/components/ListItemWithRadioButton/ListItemWithRadioButton";
import {SelectMultiple} from "./selectMultiple/SelectMultiple";
import classes from "./selectMultiple/components/ListItemWithRadioButton/listItemWithRadioButton.module.scss";
import {ListItem, Radio, TextField} from "@material-ui/core";

export const SelectRadio = (props:  {
    isEditing?: boolean,
    value?: string,
    checkedValues?: any[],
    radioButtonOnChange: () => void,
    itemValueOnChange: () => void,
    items?: any
    name: string,
    onClick?: () => void,
    title: string
}) => {

    return <SelectMultiple
        items={props.items}
        onClick={props.onClick}
        title={props.title}
    >

    </SelectMultiple>
};