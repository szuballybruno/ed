import React from "react";
import {ListItem, Radio, RadioGroup} from "@material-ui/core";
import classes from "./listItemWithRadioButton.module.scss";
import {TextOrInput} from "../TextOrInput/TextOrInput";

export const ListItemWithRadio = (props: {
    isEditing?: boolean,
    value?: string,
    checked?: boolean,
    checkBoxOnChange: (e: React.ChangeEvent<any>) => any,
    editOnChange?: (e: React.ChangeEvent<any>) => any,
    doneButtonOnClick?: (e: React.MouseEvent<any>) => any
    name: string
}) => <ListItem className={classes.listItem}>
    <Radio name={props.name}
           value={props.value} checked={props.checked} />
    <TextOrInput {...props} />
</ListItem>