import { Flex } from '@chakra-ui/react';
import React from 'react';
import { mockTasks } from '../mockData';
import { EpistoHeader } from './administration/universal/EpistoHeader';
import LearningStatistics from "./learningStatistics/LearningStatistics";
import { Tasks } from './Tasks';
import { DashboardSection } from './universal/DashboardSection';
import { PersonalityAssessment } from './universal/PersonalityAssessment';

export const LearningInsightsOverview = () => {

    return <Flex direction="column">

        {/* tasks */}
        <DashboardSection title="Feladataim">
            <Tasks currentTasks={mockTasks} />
        </DashboardSection>

        {/* personality */}
        <DashboardSection title="Személyes tanulási analízis" minHeight="500px">
            <PersonalityAssessment className="whall" />
        </DashboardSection>

        {/* stats */}
        <DashboardSection title="Statisztikám" minHeight="500px">
            <LearningStatistics />
        </DashboardSection>

        {/* badges */}
        <EpistoHeader text="Megszerzett jelvényeim" />
    </Flex>
};
