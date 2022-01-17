import { Flex } from "@chakra-ui/layout";
import React, { ReactNode } from 'react';
import { EpistoHeader } from "../EpistoHeader";
import classes from "./learningStatistics.module.scss"

export const LearningStatisticsSeciton = (props: {
    title: string,
    children: ReactNode
}) => {
    return <Flex width="100%" maxW="100%" direction="column" p="20px">

        <EpistoHeader variant="sub" text={props.title} pl="0" />

        <div className={classes.gridContainer}>
            {props.children}
        </div>

    </Flex>
};
