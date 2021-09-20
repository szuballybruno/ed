import React from 'react';
import classes from "./adminDashboardHeader.module.scss";
import { Grid, Typography } from "@mui/material";

const AdminDashboardHeader = (props: {
    titleText: string;
}) => {
    return (
        <Grid id="adminDashboardHeaderRoot" container alignItems={"flex-end"} className={classes.manageUsersHeaderWrapper}>
            <Typography variant={"h5"} classes={{ root: classes.manageUsersHeaderText }}>{props.titleText}</Typography>
        </Grid>
    );
}

export default AdminDashboardHeader;
