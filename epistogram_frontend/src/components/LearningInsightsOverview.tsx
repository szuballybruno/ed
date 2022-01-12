import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { translatableTexts } from '../static/translatableTexts';
import { Badges } from "./Badges";
import { DashboardSection } from './universal/DashboardSection';
import { PersonalityAssessment } from './universal/PersonalityAssessment';
import { LearningCurves } from "./LearningCurves";
import { LearningStatistics } from './learningInsights/LearningStatistics';

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

        {/* badges */}
        <DashboardSection
            className="roundBorders largeSoftShadow"
            background="var(--transparentWhite70)"
            mt="10px"
            title={translatableTexts.learningOverview.myBadgesTitle}
            minHeight="200px">

            <Badges />
        </DashboardSection>
    </Flex>
};
