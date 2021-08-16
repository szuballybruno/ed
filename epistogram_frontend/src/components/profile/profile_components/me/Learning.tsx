import React from 'react';
import classes from './learning.module.scss';
import AdminDashboardHeader from "../../../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import Achievements from "./learning_components/Achievements";
import Tasks from "./learning_components/Tasks";
import LearningStatistics from "./learning_components/LearningStatistics";
import userDetailsState from "../../../../store/user/userSideState";
import {useState} from "@hookstate/core";
import {LearningRadarChart} from "./learning_components/LearningRadarChart";

// Notes module commented out for demos

const Learning = () => {
    const user = useState(userDetailsState)
    return <div className={classes.meWrapper}>
        <AdminDashboardHeader titleText={"Feladataim"} />
        <Tasks tasksArray={user.userData.tasks.get()} />
        <AdminDashboardHeader titleText={"Személyes tanulási analízis"} />
        <LearningRadarChart />
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
