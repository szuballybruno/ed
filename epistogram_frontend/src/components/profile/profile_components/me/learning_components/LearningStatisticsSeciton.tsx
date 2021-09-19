import React from 'react';
import classes from "./learningStatisticsSection.module.scss";
import { Divider, Typography } from "@mui/material";

// HOC for a user statistics group like e.g.: focus, videos, time management

export const LearningStatisticsSeciton = (props: {
    title: string,
    children: React.ReactNode | React.ReactNode[]
}) => {
    return <div className={classes.sectionWrapper}>
        <div className={classes.learningListHeaderWrapper}>
            <Typography variant={"overline"}>{props.title}</Typography>
        </div>
        <Divider style={{ width: "99%" }} />
        <div className={classes.gridContainer}>
            {props.children}
        </div>
    </div>
};