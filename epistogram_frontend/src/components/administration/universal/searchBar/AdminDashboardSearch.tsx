import React from 'react';
import classes from "./adminDashboardSearch.module.scss";
import {Grid, TextField, Typography} from "@material-ui/core";

export const AdminDashboardSearch = (props: {
    searchChangeHandler: (name: string, value: string) => void,
    name: string,
    title?: string,
    className?: string
}) => {
    return <Grid container className={`${classes.manageUsersSearchWrapper} ${props.className}`}>
        {props.title && <Grid container direction={"row"} justify={"flex-start"}>
            <Typography variant={"overline"}>{props.title}</Typography>
        </Grid>}
        <TextField variant={"outlined"}
                   fullWidth
                   placeholder="A kereséshez kezdjen el gépelni..."
                   name={props.name}
                   onChange={(e) => props.searchChangeHandler(e.currentTarget.name, e.currentTarget.value)} />
    </Grid>
};
