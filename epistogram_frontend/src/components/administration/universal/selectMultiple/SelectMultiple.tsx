import React from 'react';
import classes from "./selectMultiple.module.scss";
import { Fab, FormControl, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export const SelectMultiple = (props: {
    children: React.ReactNode
    items?: any
    onClick?: () => void
    title: string
}) => {

    const showAdd = !!props.onClick

    const searchOnChange = () => { }

    return <div className={classes.formWrapper}>
        <div>
            <Typography variant={"overline"}>{props.title}</Typography>
        </div>

        <TextField className={classes.filterInput} size={"small"} placeholder={"Szűrés"} variant={"outlined"} onChange={searchOnChange} />

        <FormControl component="fieldset" className={classes.formControl}>
            {props.children}
        </FormControl>

        {showAdd && <Fab color="primary"
            aria-label="add"
            onClick={props.onClick}
            style={{ position: "absolute", bottom: 10, right: 25 }}>
            <Add />
        </Fab>}
    </div>
};