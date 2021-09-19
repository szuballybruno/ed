import React from 'react';
import classes from "./adminDashboardMenuItem.module.scss";
import { Typography } from "@mui/material";
import {
    BarChart, Business,
    ChromeReaderMode,
    Group,
    Person,
    Subscriptions,
    ThumbsUpDown
} from "@mui/icons-material";
import { NavLink } from 'react-router-dom';

const AdminDashboardMenuItem = (props: { title: string, index: number, url: string }) => {
    const icons = {
        0: <BarChart color={"secondary"} />,
        1: <Person color={"secondary"} />,
        2: <Subscriptions color={"secondary"} />,
        3: <ChromeReaderMode color={"secondary"} />,
        4: <ThumbsUpDown color={"secondary"} />,
        5: <Group color={"secondary"} />,
        6: <Business color={"secondary"} />
    }

    return <NavLink className={classes.adminDashboardMenuItem}
        to={props.url}
        activeClassName={classes.adminDashboardMenuItemSelected}
        key={props.index}>
        {icons[props.index]}
        <Typography color={"secondary"} className={classes.adminDashboardMenuItemText} variant={"button"}>{props.title}</Typography>
    </NavLink>
}

export default AdminDashboardMenuItem;
