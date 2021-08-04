import React from 'react';
import CourseTile from '../../../../universal/courseTile/CourseTile';
import classes from "./recommendedCourses.module.scss";
import {useState} from "@hookstate/core"
import userSideState from '../../../../../globalStates/userSideState';

const RecommendedCourses = () => {
    const user = useState(userSideState)

    return (
        <div className={classes.recommendedCoursesWrapper}>
            <div className={classes.coursesOuterRow}>
                <h1>Ajánlott kurzusok</h1>
                <div className={classes.coursesInnerRow}>
                    {user.userData.recommendedCourses.get() === [] ? user.userData.recommendedCourses.get().map((course) => {
                        return <CourseTile />
                    }): ""}
                </div>
            </div>
        </div>
    );
};

export default RecommendedCourses;
