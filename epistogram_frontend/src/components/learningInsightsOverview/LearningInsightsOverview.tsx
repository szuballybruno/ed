import { Flex } from '@chakra-ui/react';
import React from 'react';
import { EpistoHeader } from '../administration/universal/EpistoHeader';
import LearningStatistics from "../profile/profile_components/me/learning_components/LearningStatistics";
import Tasks from "../profile/profile_components/me/learning_components/Tasks";
import { FlexFloat } from '../universal/FlexFloat';
import { PersonalityChart } from "../universal/PersonalityChart";

const tasks = [
    {
        addedDate: Date.now(),
        addedBy: "Spengler Manfréd",
        name: "Összefoglaló írása az office kurzusból",
        due: "Vasárnap",
        status: "Kész"
    }
];

export const LearningInsightsOverview = () => {

    return <Flex direction="column">

        {/* tasks */}
        <EpistoHeader text="Feladataim" />
        <FlexFloat height="50px" p="30px" borderRadius="none" boxShadow="none" borderLeft="3px solid var(--epistoTeal)">
            <Tasks tasksArray={tasks} />
        </FlexFloat>

        {/* personality */}
        <EpistoHeader text="Személyes tanulási analízis" />
        <FlexFloat height="400px" p="30px" borderRadius="none" boxShadow="none" borderLeft="3px solid var(--epistoTeal)">
            <PersonalityChart />
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
