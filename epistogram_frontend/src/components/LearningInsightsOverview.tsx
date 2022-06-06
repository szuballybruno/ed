import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { LearningStatisticsOverview } from './learningInsights/LearningStatisticsOverview';
import { PersonalityAssessment } from './universal/PersonalityAssessment';

export const LearningInsightsOverview = () => {

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    return <Flex
        direction="column"
        pb="40px"
        minWidth={isSmallerThan1400 ? '1060px' : undefined}>

        <LearningStatisticsOverview />

        {/* personality */}
        <PersonalityAssessment />

        { // disabled temporarily

        /* learning curves 
        <LearningCurves />*/}
    </Flex>;
};
