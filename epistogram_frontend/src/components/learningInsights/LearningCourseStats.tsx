import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { useUserCourseData } from "../../services/api/courseApiService";
import { LoadingFrame } from "../system/LoadingFrame";
import { DashboardSection } from "../universal/DashboardSection";
import { EpistoGrid } from "../controls/EpistoGrid";
import { LearningCourseStatsTile } from "./LearningCourseStatsTile";
import { EpistoFont } from "../controls/EpistoFont";
import { AdminUserCourseContentModal } from "../administration/users/modals/AdminUserCourseContentModal";
import { useEpistoDialogLogic } from "../EpistoDialog";

export const LearningCourseStats = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = useUserCourseData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const isAnyCoursesInProgress = coursesData?.isAnyCoursesInProgress;
    const completedCourses = coursesData?.completedCourses ?? [];
    const inProgressCourses = coursesData?.inProgressCourses ?? [];

    const dialogLogic = useEpistoDialogLogic("sasd", {
        defaultCloseButtonType: "top"
    });

    return <LoadingFrame
        loadingState={coursesDataStatus}
        error={coursesDataError}
        direction="column"
        className="Whall"
        minWidth="100%"
        flex="1">

        <AdminUserCourseContentModal
            userCourseStatsData={{
                userProgressData: {
                    startDate: new Date("2022. 04. 10."),
                    estimatedCompletionDate: new Date("2022. 05. 10."),
                    estimatedLengthInDays: 30,
                    days: [
                        {
                            completionDate: new Date("2022. 05. 10."),
                            completedItemCount: 4,
                            completedPercentage: 5,
                            offsetDaysFromStart: 0,
                            completedPercentageSum: 5
                        },
                        {
                            completionDate: new Date("2022. 05. 12."),
                            completedItemCount: 4,
                            completedPercentage: 8,
                            offsetDaysFromStart: 0,
                            completedPercentageSum: 13
                        },
                        {
                            completionDate: new Date("2022. 05. 12."),
                            completedItemCount: 4,
                            completedPercentage: 2,
                            offsetDaysFromStart: 0,
                            completedPercentageSum: 15
                        },
                        {
                            completionDate: new Date("2022. 05. 12."),
                            completedItemCount: 4,
                            completedPercentage: 2,
                            offsetDaysFromStart: 0,
                            completedPercentageSum: 17
                        },
                        {
                            completionDate: new Date("2022. 05. 12."),
                            completedItemCount: 4,
                            completedPercentage: 8,
                            offsetDaysFromStart: 0,
                            completedPercentageSum: 25
                        },
                        {
                            completionDate: new Date("2022. 05. 12."),
                            completedItemCount: 4,
                            completedPercentage: 8,
                            offsetDaysFromStart: 0,
                            completedPercentageSum: 33
                        }
                    ]
                },
                completedVideoCount: 48,
                totalVideoPlaybackSeconds: 60 * 60 * 3.5,
                totalGivenAnswerCount: 39,
                totalCorrectAnswerRate: 74

            }}
            dialogLogic={dialogLogic} />

        {/* completed courses */}
        <DashboardSection
            width="100%"
            variant="normal"
            title="Elvégzett kurzusaim" >

            {isAnyCoursesComplete
                ? <EpistoGrid
                    minColumnWidth="300px"
                    auto="fill"
                    gap="10px"
                    p="10px">

                    {completedCourses
                        .map((course, index) => <LearningCourseStatsTile onClickDetails={() => { dialogLogic.openDialog() }} course={course} />)}

                </EpistoGrid>

                : <Flex p="100px">

                    <EpistoFont fontSize="fontHuge">

                        Még nem végeztél el egyetlen kurzust sem.
                    </EpistoFont>
                </Flex>}
        </DashboardSection >

        {/* in progress courses  */}
        <DashboardSection width="100%" variant="noShadow" title="Folyamatban lévő kurzusaim">
            {isAnyCoursesInProgress
                ? <EpistoGrid
                    minColumnWidth="250px"
                    auto="fill"
                    gap="10px"
                    p="10px">
                    {inProgressCourses
                        .map((course, index) => {
                            return <LearningCourseStatsTile onClickDetails={() => { dialogLogic.openDialog() }} course={course} />
                        })
                    }
                </EpistoGrid>
                : <Flex p="100px">

                    <EpistoFont fontSize="fontHuge">

                        Még nem kezdtel el egyetlen kurzust sem.
                    </EpistoFont>
                </Flex>}
        </DashboardSection>
    </LoadingFrame>
};
