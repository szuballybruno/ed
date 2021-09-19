import React from 'react';
import classes from "./addUserHeader.module.scss";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useParams, useRouteMatch, matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
    BarChart,
    PersonOutlineTwoTone, SubscriptionsOutlined, SubscriptionsTwoTone,
} from "@mui/icons-material";

export const AdminAddHeader = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const statisticsMatches = useRouteMatch("/admin/statistics");
    const usersMatches = useRouteMatch("/admin/manage/users");
    const addUserMatches = useRouteMatch("/admin/manage/users/add");
    const coursesMatches = useRouteMatch("/admin/manage/courses");
    const addCoursesMatches = useRouteMatch("/admin/manage/courses/add");
    const editCoursesMatches = useRouteMatch("/admin/manage/courses/:courseId");
    const editVideoMatches = useRouteMatch("/admin/manage/courses/:courseId/item/:itemId");

    const BreadcrumbLink = (props: { to: string, title: string, iconComponent?: JSX.Element }) => <NavLink to={props.to}>
        <Typography className={classes.breadcrumbTitle} style={matchPath(window.location.pathname, {
            path: props.to,
            exact: true,
            strict: false
        })?.path === props.to ? {
            fontWeight: "bold",
        } : {}}>{props.iconComponent}{props.title}</Typography>
    </NavLink>

    //TODO: Navigate back to previously edited course or video on click e.g.: not to :courseId but the real courseId

    return <div className={classes.breadCrumbsWrapper}>
        <Breadcrumbs>
            {statisticsMatches && <BreadcrumbLink to={"/admin/statistics"} title={"Statisztika"} iconComponent={<BarChart color={"secondary"} />} />}
            {usersMatches && <BreadcrumbLink to={"/admin/manage/users"} title={"Felhasználók kezelése"} iconComponent={<PersonOutlineTwoTone color={"secondary"} />} />}
            {addUserMatches && <BreadcrumbLink to={"/admin/manage/users/add"} title={"Felhasználó hozzáadása"} />}
            {coursesMatches && <BreadcrumbLink to={"/admin/manage/courses"} title={"Kurzusok kezelése"} iconComponent={<SubscriptionsTwoTone color={"secondary"} />} />}
            {addCoursesMatches && <BreadcrumbLink to={"/admin/manage/courses/add"} title={"Kurzus hozzáadása"} />}
            {editCoursesMatches && <BreadcrumbLink to={`/admin/manage/courses/:courseId`} title={"Kurzus szerkesztése"} />}
            {editVideoMatches && <BreadcrumbLink to={`/admin/manage/courses/:courseId/item/:itemId`} title={"Videó szerkesztése"} />}
        </Breadcrumbs>
    </div>
}
