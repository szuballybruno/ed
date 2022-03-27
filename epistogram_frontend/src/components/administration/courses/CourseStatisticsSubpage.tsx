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
                            title={"Megválaszolt tudást vizsgáló kérdések száma"}
                            value={"39"}
                            suffix={"db"}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic1.png")}
                            isOpenByDefault={false} />

                        {/* total playback time */}
                        <StatisticsCard
                            title={"Helyes válaszok aránya"}
                            value={"27"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic2.png")}
                            isOpenByDefault={false} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            additionalInfo={{
                                change: "down",
                                value: "20",
                                suffix: "%"
                            }}
                            title={"Reakcióidő"}
                            value={"Átlagos"}
                            suffix={""}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic3.png")}
                            isOpenByDefault={false} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={"Átlagos napi megtekintett videók"}
                            value={"6.5"}
                            suffix={"db/nap"}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic4.png")}
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
                            title={"Megválaszolt tudást vizsgáló kérdések száma"}
                            value={"39"}
                            suffix={"db"}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic1.png")}
                            isOpenByDefault={false} />

                        {/* total playback time */}
                        <StatisticsCard
                            title={"Helyes válaszok aránya"}
                            value={"27"}
                            suffix={"%"}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic2.png")}
                            isOpenByDefault={false} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            additionalInfo={{
                                change: "down",
                                value: "20",
                                suffix: "%"
                            }}
                            title={"Reakcióidő"}
                            value={"Átlagos"}
                            suffix={""}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic3.png")}
                            isOpenByDefault={false} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={"Átlagos napi megtekintett videók"}
                            value={"6.5"}
                            suffix={"db/nap"}
                            iconPath={getAssetUrl("images/teacherdashboardstatistic4.png")}
                            isOpenByDefault={false} />


                    </Grid>
                </Flex>
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    )
};
