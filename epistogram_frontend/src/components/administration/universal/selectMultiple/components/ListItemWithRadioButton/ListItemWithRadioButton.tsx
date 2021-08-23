import React from "react";
import {ListItem, Radio, RadioGroup, TextField} from "@material-ui/core";
import classes from "./listItemWithRadioButton.module.scss";
import {TextOrInput} from "../TextOrInput/TextOrInput";

export const ListItemWithRadio = (props: {
    value?: string,
    checked?: boolean,
    radioButtonOnChange: () => void,
    itemValueOnChange: () => void,
    name: string
}) => <ListItem className={classes.listItem}>
    <Radio name={props.name}
           value={props.value}
           checked={props.checked} />
    <TextField size={"small"}
               name={props.value}
               value={props.name}
               onChange={props.itemValueOnChange} />
</ListItem>