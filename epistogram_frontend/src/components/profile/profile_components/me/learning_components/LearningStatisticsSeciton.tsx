import { Flex } from "@chakra-ui/layout";
import React, { ReactNode } from 'react';
import { EpistoHeader } from "../../../../administration/universal/EpistoHeader";
import { EpistoGrid } from "../../../../universal/EpistoGrid";
import classes from "./learningStatisticsSection.module.scss";

// HOC for a user statistics group like e.g.: focus, videos, time management

export const LearningStatisticsSeciton = (props: {
    title: string,
    children: ReactNode
}) => {
    return <Flex direction="column">

        <EpistoHeader variant="sub" text={props.title} showDivider />

        <EpistoGrid minColumnWidth="250px" columnGap="10">
            {props.children}
        </EpistoGrid>
    </Flex>
};