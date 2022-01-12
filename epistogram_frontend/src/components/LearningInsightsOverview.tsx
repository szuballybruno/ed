import { Flex } from '@chakra-ui/react';
import React from 'react';
import { translatableTexts } from '../static/translatableTexts';
import { Badges } from "./Badges";
import { DashboardSection } from './universal/DashboardSection';
import { PersonalityAssessment } from './universal/PersonalityAssessment';
import { LearningCurves } from "./LearningCurves";
import { LearningStatistics } from './learningInsights/LearningStatistics';

export const LearningInsightsOverview = () => {

    return <Flex direction="column" pb="40px">

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
