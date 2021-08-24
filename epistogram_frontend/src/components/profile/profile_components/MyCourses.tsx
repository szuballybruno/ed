import { Typography } from "@material-ui/core";
import React from 'react';
import { LoadingFrame } from "../../../HOC/loading_frame/LoadingFrame";
import { CourseShortDTO } from "../../../models/shared_models/CourseShortDTO";
import { useUserProfileData } from "../../../services/userProfileDataService";
import AdminDashboardHeader from "../../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import CourseTile from "../../universal/atomic/courseTile/CourseTile";
import classes from './myCourses.module.scss';

const MyCourses = () => {

    const { userProfileData, status, error } = useUserProfileData();
    const completedCourses = userProfileData?.completedCourses ?? [] as CourseShortDTO[];
    const favoriteCourses = userProfileData?.favoriteCourses ?? [] as CourseShortDTO[];
    const hasCompletedCourses = completedCourses.length > 0;
    const hasFavoriteCourses = completedCourses.length > 0;

    return <div className={classes.coursesInnerWrapper}>

        <LoadingFrame loadingState={status} error={error}>
            {/* completed courses */}
            <AdminDashboardHeader titleText={"Elvégzett kurzusaim"} />
            <div className={classes.coursesInnerRow}>
                {hasCompletedCourses
                    ? completedCourses
                        .map((course, index) => {
                            return <CourseTile className={classes.courseItem} course={course} itemIndex={index} />
                        })
                    : <div className={classes.noCoursesWrapper}>
                        <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                    </div>}
            </div>

            {/* favorite courses */}
            <AdminDashboardHeader titleText={"Kedvenc kurzusaim"} />
            <div className={classes.coursesInnerRow}>
                {hasFavoriteCourses
                    ? favoriteCourses
                        .map((course, index) => {
                            return <CourseTile className={classes.courseItem} course={course} itemIndex={index} />
                        })
                    : <div className={classes.noCoursesWrapper}>
                        <Typography variant={"h6"}>Még nincs egy kedvenc kurzusod sem.</Typography>
                    </div>}
            </div>

            <AdminDashboardHeader titleText={""} />
        </LoadingFrame>
    </div>
};

export default MyCourses;
