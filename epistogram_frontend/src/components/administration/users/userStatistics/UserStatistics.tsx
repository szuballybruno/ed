import React from 'react';
import classes from './userStatistics.module.scss'
import LearningStatistics
    from "../../../profile/profile_components/me/learning_components/LearningStatistics";

export const UserStatistics = () => {
    return (
        <div className={classes.userStatisticsWrapper}>
            <LearningStatistics className={classes.statisticsItem} />
        </div>
    );
};
