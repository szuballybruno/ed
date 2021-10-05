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
            objective: "video",
            name: "Elme karbantartása",
            createdBy: "Spengler Manfréd",
            status: "assigned",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            priority: "normal"
        },
        {
            objective: "playlist",
            name: "Gravitációs normák kisimítása",
            createdBy: "Spengler Manfréd",
            status: "inProgress",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            priority: "important"
        },
        {
            objective: "course",
            name: "Összefoglaló írása az office kurzusból",
            createdBy: "Spengler Manfréd",
            status: "submitted",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            priority: "urgent"
        },
        {
            objective: "exam",
            name: "Új barátok szerzése",
            createdBy: "Spengler Manfréd",
            status: "rejected",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            priority: "normal"
        },
        {
            objective: "video",
            name: "Epistogram kihasználása, maximális szinten",
            createdBy: "Spengler Manfréd",
            status: "completed",
            creationDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            priority: "normal"
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
