import React, { ReactNode } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoHeader } from '../EpistoHeader';
import classes from './learningStatistics.module.scss';

export const LearningStatisticsSeciton = (props: {
    title: string,
    children: ReactNode
}) => {
    return <EpistoFlex2 width="100%"
        maxW="100%"
        direction="column"
        padding="20px">

        <EpistoHeader variant="sub"
            text={props.title}
            pl="0" />

        <div className={classes.gridContainer}>
            {props.children}
        </div>

    </EpistoFlex2>;
};
