/** Kész
 *  TODO: - Reszponzivitás
 *        - Error handling
 */


import React from 'react';
import classes from './currentCourseStats.module.scss'
import {useState} from "@hookstate/core";
import userDetailsState from "../../../../store/user/userSideState";
import ListItem from "../../../universal/atomic/listItem/ListItem";

const CurrentCourseStats = () => {
    const user = useState(userDetailsState)

    return (
        <div className={classes.coursesContainer}>
            {user.userData.currentCourse.items.get().map((video, index) => {
                return video.type === "video" ? <ListItem thumbnailUrl={video.thumbnailUrl}
                                 mainTitle={video.title}
                                 subTitle={video.subTitle} /> : <ListItem mainTitle={"Vizsga"}
                                                                               subTitle={"Teszteld a tudásod"}
                                                                               onClick={() => {

                                                                               }} />
            })}

        </div>
    );
};

export default CurrentCourseStats;
