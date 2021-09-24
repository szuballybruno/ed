import { Box, Flex, Grid } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { useUserCourseData } from "../../services/courseService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import CourseTile from "../universal/CourseTile";
import { DashboardSection } from "../universal/DashboardSection";
import { FlexFloat } from "../universal/FlexFloat";

const CourseStatCard = (props: { course: CourseShortDTO }) => {

    const { title, thumbnailImageURL } = props.course;

    const stats = [
        {
            text: "Focus 24%"
        },
        {
            text: "Accuarcy 24%"
        },
        {
            text: "Compelted exams: 45"
        },
        {
            text: "Completed in: 3h"
        },
        {
            text: "Data: 123"
        },
    ]

    return <CourseTile course={props.course} borderRadius="0">
        <Grid
            gridTemplateColumns="repeat(auto-fill, minmax(150px , 1fr))"
            columnGap="5px"
            rowGap="5px"
            mt="20px">
            {stats
                .map(stat => <FlexFloat
                    p="10px"
                    boxShadow="0"
                    borderRadius="0"
                    borderLeft="4px solid var(--epistoTeal)">
                    {stat.text}
                </FlexFloat>)}
        </Grid>
    </CourseTile>
}

const MyCourses = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = useUserCourseData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const isAnyCoursesInProgress = coursesData?.isAnyCoursesInProgress;
    const completedCourses = coursesData?.completedCourses ?? [];
    const inProgressCourses = coursesData?.inProgressCourses ?? [];

    return <LoadingFrame
        loadingState={coursesDataStatus}
        error={coursesDataError}
        direction="column">

        {/* completed courses */}
        <DashboardSection title="Elvégzett kurzusaim" boxShadow="none">
            {isAnyCoursesComplete
                ? <Grid
                    gridTemplateColumns="repeat(auto-fill, minmax(300px , 1fr))"
                    gap="15px"
                    p="20px">

                    {completedCourses
                        .map((course, index) => <CourseStatCard key={index} course={course} />)}
                </Grid>

                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection >

        <DashboardSection title="Folyamatban lévő kurzusaim" boxShadow="none">
            {isAnyCoursesInProgress
                ? <Grid
                    gridTemplateColumns="repeat(auto-fill, minmax(300px , 1fr))"
                    columnGap="15px"
                    rowGap="15px"
                    p="20px">
                    {inProgressCourses
                        .map((course, index) => <CourseStatCard key={index} course={course} />)}
                </Grid>
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection>
    </LoadingFrame>
};

export default MyCourses;
