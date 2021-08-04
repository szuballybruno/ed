import React from 'react';
import classes from './myCourses.module.scss'
import {useState} from "@hookstate/core";
import userSideState from "../../../store/user/userSideState";
import CourseTile from "../../universal/atomic/courseTile/CourseTile";
import AdminDashboardHeader from "../../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import {Typography} from "@material-ui/core";

const MyCourses = () => {
    const user = useState(userSideState)

    //TODO: Külön kurzus state-ek

    return <div className={classes.coursesInnerWrapper}>
        <AdminDashboardHeader titleText={"Elvégzett kurzusaim"} />
        <div className={classes.coursesInnerRow}>
            {user.userData.doneCourses[0].get() ? user.userData.doneCourses.get().map((course, index) => {
                return <CourseTile className={classes.courseItem} item={course} itemIndex={index} />
            }) : <div className={classes.noCoursesWrapper}>
                <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
            </div>}
        </div>
        <AdminDashboardHeader titleText={"Kedvenc kurzusaim"} />
        <div className={classes.coursesInnerRow}>
            {user.userData.favoriteCourses[0].get() ? user.userData.favoriteCourses.get().map((course, index) => {
                return <CourseTile className={classes.courseItem} item={course} itemIndex={index} />
            }) : <div className={classes.noCoursesWrapper}>
                <Typography variant={"h6"}>Még nincs egy kedvenc kurzusod sem.</Typography>
            </div>}
        </div>
        <AdminDashboardHeader titleText={""} />
    </div>
};

export default MyCourses;
