import { Flex } from '@chakra-ui/react';
import React from 'react';
import { CurrentTasksDTO } from '../models/shared_models/CurrentTasksDTO';
import { EpistoHeader } from './administration/universal/EpistoHeader';
import LearningStatistics from "./learningStatistics/LearningStatistics";
import { Tasks } from './Tasks';
import { DashboardSection } from './universal/DashboardSection';
import { FlexFloat } from './universal/FlexFloat';
import { PersonalityAssessment } from './universal/PersonalityAssessment';

const tasks = {
    tasks: [
        {
            objective: "practise",
            name: "Összefoglaló írása az office kurzusból",
            createdBy: "Spengler Manfréd",
            status: "Kesz",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            priority: "high"
        }
    ]
} as CurrentTasksDTO;

export const LearningInsightsOverview = () => {

    return <Flex direction="column">

        {/* tasks */}
        <DashboardSection title="Feladataim">
            <Tasks currentTasks={tasks} />
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
