import { Flex } from '@chakra-ui/react';
import React from 'react';
import { mockTasks } from '../mockData';
import { translatableTexts } from '../translatableTexts';
import { Badges } from "./Badges";
import LearningStatistics from "./learningStatistics/LearningStatistics";
import { Tasks } from './Tasks';
import { DashboardSection } from './universal/DashboardSection';
import { PersonalityAssessment } from './universal/PersonalityAssessment';

export const LearningInsightsOverview = () => {

    return <Flex direction="column">

        {/* tasks */}
        <DashboardSection title={translatableTexts.learningOverview.tasksTitle}>
            <Tasks currentTasks={mockTasks} />
        </DashboardSection>

        {/* personality */}
        <DashboardSection title={translatableTexts.learningOverview.personalLearningAnalysisTitle} minHeight="500px">
            <PersonalityAssessment className="whall" />
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
