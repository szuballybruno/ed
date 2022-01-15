import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { LearningCurves } from "./LearningCurves";
import { PersonalityAssessment } from './universal/PersonalityAssessment';

export const LearningInsightsOverview = () => {
    
    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    return <Flex
        direction="column"
        pb="40px"
        minW={isSmallerThan1400 ? "1060px" : undefined}>

        {/* personality */}
        <PersonalityAssessment />

        {/* learning curves */}
        <LearningCurves />
    </Flex>
};
