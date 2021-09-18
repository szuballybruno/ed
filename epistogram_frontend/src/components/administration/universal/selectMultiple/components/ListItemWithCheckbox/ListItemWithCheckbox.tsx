import React from "react";
import classes from "./listItemWithCheckBox.module.scss"
import { Checkbox, ListItem } from "@mui/material";
import { TextOrInput } from "../TextOrInput/TextOrInput";

export const ListItemWithCheckbox = (props: {
    key: any,
    isEditing?: boolean
    showCheckBox?: boolean
    checked?: boolean
    checkBoxOnChange: (e: React.ChangeEvent<any>) => any,
    editOnChange?: (e: React.ChangeEvent<any>) => any,
    showDeleteButton?: boolean
    deleteButtonOnClick?: (e: React.MouseEvent<any>) => any
    doneButtonOnClick?: (e: React.MouseEvent<any>) => any
    name: string
    value?: string
}) => <ListItem className={classes.listItem}
    key={props.key}
    dense>
        {props.showCheckBox && <Checkbox className={classes.checkbox}
            checked={props.checked}
            onChange={props.checkBoxOnChange}
            name={props.name}
            value={props.value} />}
        <TextOrInput {...props} />
    </ListItem>