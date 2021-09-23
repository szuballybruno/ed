import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { CurrentTasksDTO } from '../../models/shared_models/CurrentTasksDTO';
import { EpistoHeader } from '../administration/universal/EpistoHeader';
import LearningStatistics from "../profile/profile_components/me/learning_components/LearningStatistics";
import { Tasks } from '../Tasks';
import { FlexFloat } from '../universal/FlexFloat';
import { PersonalityAssessment } from '../universal/PersonalityAssessment';
import { PersonalityChart } from "../universal/PersonalityChart";

const tasks = {
    tasks: [
        {
            objective: "practise",
            name: "Összefoglaló írása az office kurzusból",
            createdBy: "Spengler Manfréd",
            status: "Kesz",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
        }
    ]
} as CurrentTasksDTO;

export const LearningInsightsOverview = () => {

    return <Flex direction="column">

        {/* tasks */}
        <EpistoHeader text="Feladataim" />
        <FlexFloat p="30px" borderRadius="none" boxShadow="none" borderLeft="3px solid var(--epistoTeal)">
            <Tasks currentTasks={tasks} />
        </FlexFloat>

        {/* personality */}
        <EpistoHeader text="Személyes tanulási analízis" />
        <FlexFloat height="400px" p="30px" borderRadius="none" boxShadow="none" borderLeft="3px solid var(--epistoTeal)">
            <PersonalityAssessment flex="1" />
        </FlexFloat>

        {/* stats */}
        <EpistoHeader text="Statisztikám" />
        <FlexFloat p="30px" borderRadius="none" boxShadow="none" borderLeft="3px solid var(--epistoTeal)">
            <LearningStatistics />
        </FlexFloat>

        {/* badges */}
        <EpistoHeader text="Megszerzett jelvényeim" />
    </Flex>
};
