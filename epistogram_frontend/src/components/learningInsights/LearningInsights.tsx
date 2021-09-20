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

export const LearningInsights = () => {

    return <Flex direction="column">

        {/* tasks */}
        <EpistoHeader text="Feladataim" />
        <Tasks tasksArray={tasks} />

        {/* personality */}
        <EpistoHeader text="Személyes tanulási analízis" />
        <FlexFloat height="400px" p="30px">
            <PersonalityChart />
        </FlexFloat>

        {/* stats */}
        <EpistoHeader text="Statisztikám" />
        <LearningStatistics />

        {/* badges */}
        <EpistoHeader text="Megszerzett jelvényeim" />
    </Flex>
};
