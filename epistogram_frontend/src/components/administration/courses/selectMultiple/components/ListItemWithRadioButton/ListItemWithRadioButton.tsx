import React from "react";
import { ListItem, Radio, RadioGroup, TextField } from "@mui/material";
import classes from "./listItemWithRadioButton.module.scss";
import { TextOrInput } from "../TextOrInput/TextOrInput";

export const ListItemWithRadio = (props: {
    value?: string | number,
    checked?: boolean,
    radioButtonOnChange: () => void,
    itemValueOnChange: () => void,
    name: string
}) => <ListItem className={classes.listItem}>
        <Radio name={props.name}
            value={props.value}
            checked={props.checked} />
        <TextField size={"small"}
            name={props.name}
            value={props.value}
            onChange={props.itemValueOnChange} />
    </ListItem>