import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { useUserProfileData } from "../../services/userProfileDataService";
import CourseTile from "../universal/atomic/courseTile/CourseTile";
import { DashboardSection } from "../universal/DashboardSection";
import classes from './myCourses.module.scss';

const MyCourses = () => {

    const { userProfileData } = useUserProfileData();
    const completedCourses = userProfileData?.completedCourses ?? [] as CourseShortDTO[];
    const favoriteCourses = userProfileData?.favoriteCourses ?? [] as CourseShortDTO[];
    const hasCompletedCourses = completedCourses.length > 0;
    const hasFavoriteCourses = completedCourses.length > 0;

    return <Flex direction="column">

        {/* completed courses */}
        <DashboardSection title="Elvégzett kurzusaim">
            {hasCompletedCourses
                ? completedCourses
                    .map((course, index) => {
                        return <CourseTile className={classes.courseItem} course={course} itemIndex={index} />
                    })
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection>

        <DashboardSection title="Folyamatban lévő kurzusaim">
            {hasFavoriteCourses
                ? favoriteCourses
                    .map((course, index) => {
                        return <CourseTile className={classes.courseItem} course={course} itemIndex={index} />
                    })
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection>
    </Flex>
};

export default MyCourses;
