import { Box, Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { useUserCourseData } from "../../services/courseService";
import { DashboardSection } from "../universal/DashboardSection";

const MyCourses = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = useUserCourseData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const isAnyCoursesInProgress = coursesData?.isAnyCoursesInProgress;
    const completedCourses = coursesData?.completedCourses ?? [];
    const inProgressCourses = coursesData?.inProgressCourses ?? [];

    return < Flex direction="column" >

        {/* completed courses */}
        < DashboardSection title="Elvégzett kurzusaim" >
            {isAnyCoursesComplete
                ? completedCourses
                    .map((course, index) => {

                        return <Box key={index}>{course.title}</Box>
                    })
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection >

        <DashboardSection title="Folyamatban lévő kurzusaim">
            {isAnyCoursesInProgress
                ? inProgressCourses
                    .map((course, index) => {

                        return <Box key={index}>{course.title}</Box>
                    })
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection>
    </Flex >
};

export default MyCourses;
