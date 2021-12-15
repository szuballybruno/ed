import { Flex } from '@chakra-ui/react';
import React from 'react';
import { translatableTexts } from '../static/translatableTexts';
import { Badges } from "./Badges";
import { DashboardSection } from './universal/DashboardSection';
import { PersonalityAssessment } from './universal/PersonalityAssessment';
import { LearningCurves } from "./LearningCurves";
import { LearningStatistics } from './learningInsights/LearningStatistics';

export const LearningInsightsOverview = () => {

    return <Flex direction="column">

        {/* personality */}
        <DashboardSection title={translatableTexts.learningOverview.personalLearningAnalysisTitle} minHeight="500px">
            <PersonalityAssessment className="whall" />
        </DashboardSection>

        {/* learning curve */}
        <DashboardSection title={translatableTexts.learningOverview.learningCurveTitle} minHeight="500px">
            <LearningCurves />
        </DashboardSection>

        {/* stats */}
        <DashboardSection title={translatableTexts.learningOverview.myStatisticsTitle} minHeight="500px">
            <LearningStatistics />
        </DashboardSection>

        {/* badges */}
        <DashboardSection title={translatableTexts.learningOverview.myBadgesTitle} minHeight="200px">
            <Badges />
        </DashboardSection>
    </Flex>
};
