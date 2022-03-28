import { Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { getAssetUrl } from '../../../static/frontendHelpers';
import { EpistoGrid } from "../../controls/EpistoGrid";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { DashboardSection } from "../../universal/DashboardSection";
import { VideoHotspotsChart } from "../../universal/VideoHotspotsChart";
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { CourseViewsInAWeekChart } from '../CourseViewsInAWeekChart';
import { UserActivityDistributionChart } from '../users/UserActivityDistributionChart';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';

export const CourseStatisticsSubpage = () => {

    return (
        <CourseAdministartionFrame>

            <AdminSubpageHeader
                direction="column"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
                ]}>
                <Flex mt="10px">

                    <Grid
                        className="whall"
                        gap="10px"
                        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                        gridAutoRows="200px"
                        gridAutoFlow="column dense">

                        {/* total completed video count */}
                        <StatisticsCard
                            additionalInfo={{
                                change: "up",
                                value: "32",
                                suffix: "%"
                            }}
                            title={"Kurzus teljesítési ráta"}
                            value={"79"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/coursestaticon1.png")}
                            isOpenByDefault={false} />

                        {/* total playback time */}
                        <StatisticsCard
                            title={"Átlagos tanulással töltött idő/hét"}
                            value={"3.5"}
                            suffix={"óra"}
                            iconPath={getAssetUrl("images/coursestaticon2.png")}
                            isOpenByDefault={false} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            additionalInfo={{
                                change: "down",
                                value: "20",
                                suffix: "%"
                            }}
                            title={"Teljesítés a vizsgákon"}
                            value={"67"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/coursestaticon3.png")}
                            isOpenByDefault={false} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={"Átlagosan eltöltött idő/alkalom"}
                            value={"38"}
                            suffix={"perc"}
                            iconPath={getAssetUrl("images/coursestaticon4.png")}
                            isOpenByDefault={false} />

                        <Flex
                            className="roundBorders"
                            align="center"
                            justify="center"
                            background="var(--transparentWhite70)"
                            p="10px"
                            gridColumn="auto / span 2"
                            gridRow="auto / span 2">

                            <UserActivityDistributionChart title='Felhasználók tevékenysége' />
                        </Flex>
                    </Grid>
                </Flex>
                <Flex mt="10px">

                    <Grid
                        className="whall"
                        gap="10px"
                        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                        gridAutoRows="200px"
                        gridAutoFlow="column dense">
                        <Flex
                            className="roundBorders"
                            align="center"
                            justify="center"
                            background="var(--transparentWhite70)"
                            p="10px"
                            gridColumn="auto / span 2"
                            gridRow="auto / span 2">

                            <CourseViewsInAWeekChart title='Kurzus megtekintések alakulása' />
                        </Flex>

                        {/* total completed video count */}
                        <StatisticsCard
                            additionalInfo={{
                                change: "up",
                                value: "32",
                                suffix: "%"
                            }}
                            title={"Átlagosan megtekintett videók naponta"}
                            value={"6"}
                            suffix={"videó"}
                            iconPath={getAssetUrl("images/coursestaticon5.png")}
                            isOpenByDefault={false} />

                        {/* total playback time */}
                        <StatisticsCard
                            title={"Produktivitás alakulása (produktív folyamatok aránya nő a non produktívhoz képest)"}
                            value={"38"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/coursestaticon6.png")}
                            isOpenByDefault={false} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            additionalInfo={{
                                change: "down",
                                value: "20",
                                suffix: "%"
                            }}
                            title={"Lemorzsolódás"}
                            value={"12"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/coursestaticon7.png")}
                            isOpenByDefault={false} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={"Elköteleződés"}
                            value={"73"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/coursestaticon8.png")}
                            isOpenByDefault={false} />


                    </Grid>
                </Flex>
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    )
};
