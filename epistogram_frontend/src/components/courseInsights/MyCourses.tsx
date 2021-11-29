import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { useUserCourseData } from "../../services/courseService";
import { LoadingFrame } from "../system/LoadingFrame";
import CourseTile from "../universal/CourseTile";
import { DashboardSection } from "../universal/DashboardSection";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoGrid } from "../universal/EpistoGrid";

const MyCourses = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = useUserCourseData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const isAnyCoursesInProgress = coursesData?.isAnyCoursesInProgress;
    const completedCourses = coursesData?.completedCourses ?? [];
    const inProgressCourses = coursesData?.inProgressCourses ?? [];

    return <LoadingFrame
        loadingState={coursesDataStatus}
        error={coursesDataError}
        direction="column"
        overflowY={"scroll"}>

        {/* completed courses */}
        <DashboardSection variant="noShadow" title="Elvégzett kurzusaim" >
            {isAnyCoursesComplete
                ? <EpistoGrid
                    minColumnWidth="300px"
                    auto="fill"
                    gap="15px"
                    p="20px">

                    {completedCourses
                        .map((course, index) => <CourseTile course={course} />)}

                </EpistoGrid>

                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection >

        <DashboardSection variant="noShadow" title="Folyamatban lévő kurzusaim">
            {isAnyCoursesInProgress
                ? <EpistoGrid
                    minColumnWidth="300px"
                    auto="fill"
                    gap="15px"
                    p="20px">
                    {inProgressCourses
                        .map((course, index) => {
                            return <CourseTile tempIsStartedSwitch={true} course={course}>
                                <Flex mt="10px">

                                    {/* details */}

                                    <EpistoButton
                                        style={{ flex: "1" }}>
                                        {"Statisztika"}
                                    </EpistoButton>

                                    {/* start course */}
                                    <EpistoButton
                                        variant="colored"
                                        style={{ flex: "1" }}>

                                        {"Folytatom"}
                                    </EpistoButton>
                                </Flex>
                            </CourseTile>
                        })
                    }
                </EpistoGrid>
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection>
    </LoadingFrame>
};

export default MyCourses;
