import React from 'react';
import classes from "./selectMultiple.module.scss";
import {Fab, FormControl, TextField, Typography} from "@material-ui/core";
import {Add} from "@material-ui/icons";

export const SelectMultiple = (props: {
    listItem: React.ReactNode
    items: any[]
    onClick: () => void
    title: string
}) => {

    const showAdd = !!props.onClick

    const searchOnChange = () => {}

    return <div className={classes.formWrapper}>
        <div>
            <Typography variant={"overline"}>{props.title}</Typography>
        </div>

        <TextField className={classes.filterInput} size={"small"} placeholder={"Szűrés"} variant={"outlined"} onChange={searchOnChange} />

        <FormControl  component="fieldset" className={classes.formControl}>
            {props.items.map(item => props.listItem)}
        </FormControl>

        {showAdd && <Fab color="primary"
                               aria-label="add"
                               onClick={props.onClick}
                               style={{position: "absolute", bottom: 10, right: 25}}>
            <Add />
        </Fab>}
    </div>
};