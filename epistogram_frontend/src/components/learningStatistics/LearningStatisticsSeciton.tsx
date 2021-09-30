import { Flex } from "@chakra-ui/layout";
import React, { ReactNode } from 'react';
import { EpistoHeader } from "../administration/universal/EpistoHeader";

export const LearningStatisticsSeciton = (props: {
    title: string,
    children: ReactNode
}) => {
    return <Flex direction="column" p="20px">

        <EpistoHeader variant="sub" text={props.title} pl="0" />

        {/* <EpistoGrid minColumnWidth="250px" columnGap="10"> */}

        <Flex wrap="wrap">
            {props.children}
        </Flex>
        {/* </EpistoGrid> */}
    </Flex>
};