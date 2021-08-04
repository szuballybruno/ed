import React from 'react';
import CourseTile from '../../../universal/atomic/courseTile/CourseTile';
import classes from "./recommendedCourses.module.scss";
import {useState} from "@hookstate/core"
import userSideState from '../../../../store/user/userSideState';

const RecommendedCourses = () => {
    const user = useState(userSideState)

    return (
        <div className={classes.recommendedCoursesWrapper}>
            {user.userData.recommendedCourses.get().map((course, index) => {
                return <CourseTile item={course} itemIndex={index} />
            })}
        </div>
    );
};

export default RecommendedCourses;
