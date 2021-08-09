import React from 'react';
import classes from './learning.module.scss';
import AdminDashboardHeader from "../../../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import Achievements from "./learning_components/Achievements";
//import Notes from "./learning_components/Notes";
import Tasks from "./learning_components/Tasks";
import LearningStatistics from "./learning_components/LearningStatistics";
import userSideState from "../../../../store/user/userSideState";
import {useState} from "@hookstate/core";

// Notes module commented out for demos

const Learning = () => {
    const user = useState(userSideState)
    return <div className={classes.meWrapper}>
        <AdminDashboardHeader titleText={"Feladataim"} />
        <Tasks tasksArray={user.userData.tasks.get()} />
        {/*<AdminDashboardHeader titleText={"Jegyzetek"} />
        <Notes />*/}
        <AdminDashboardHeader titleText={"Statisztikám"} />
        <LearningStatistics />
        <AdminDashboardHeader titleText={"Megszerzett jelvényeim"} />
        <Achievements />
        <AdminDashboardHeader titleText={""} />
    </div>
};

export default Learning;
