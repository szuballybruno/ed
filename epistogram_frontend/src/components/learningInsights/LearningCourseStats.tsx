import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { useUserCourseData } from "../../services/api/courseApiService";
import { LoadingFrame } from "../system/LoadingFrame";
import { DashboardSection } from "../universal/DashboardSection";
import { EpistoGrid } from "../universal/EpistoGrid";
import { LearningCourseStatsTile } from "./LearningCourseStatsTile";

export const LearningCourseStats = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = useUserCourseData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const isAnyCoursesInProgress = coursesData?.isAnyCoursesInProgress;
    const completedCourses = coursesData?.completedCourses ?? [];
    const inProgressCourses = coursesData?.inProgressCourses ?? [];

    return <LoadingFrame
        loadingState={coursesDataStatus}
        error={coursesDataError}
        direction="column"
        className="Whall"
        minW="100%"
        flex="1">

        {/* completed courses */}
        <DashboardSection
            w="100%"
            variant="normal"
            title="Elvégzett kurzusaim" >

            {isAnyCoursesComplete
                ? <EpistoGrid
                    minColumnWidth="300px"
                    auto="fill"
                    gap="10px"
                    p="10px">

                    {completedCourses
                        .map((course, index) => <LearningCourseStatsTile course={course} />)}

                </EpistoGrid>

                : <Flex p="100px">

                    <Typography variant={"h6"}>

                        Még nem végeztél el egyetlen kurzust sem.
                    </Typography>
                </Flex>}
        </DashboardSection >

        {/* in progress courses  */}
        <DashboardSection w="100%" variant="noShadow" title="Folyamatban lévő kurzusaim">
            {isAnyCoursesInProgress
                ? <EpistoGrid
                    minColumnWidth="250px"
                    auto="fill"
                    gap="10px"
                    p="10px">
                    {inProgressCourses
                        .map((course, index) => {
                            return <LearningCourseStatsTile course={course} />
                        })
                    }
                </EpistoGrid>
                : <Flex p="100px">

                    <Typography variant={"h6"}>

                        Még nem kezdtel el egyetlen kurzust sem.
                    </Typography>
                </Flex>}
        </DashboardSection>
    </LoadingFrame>
};
