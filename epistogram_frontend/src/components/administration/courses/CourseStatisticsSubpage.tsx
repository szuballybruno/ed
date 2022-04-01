import { Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { defaultCharts } from '../../../static/defaultChartOptions';
import { getAssetUrl } from '../../../static/frontendHelpers';
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { EpistoBarChart } from '../../universal/charts/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
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

                            <EpistoPieChart
                                title="Aktivitás eloszlása"
                                isSortValues
                                segments={[
                                    { value: 30, name: 'Videók megtekintése' },
                                    { value: 17, name: 'Vizsga / tesztkitöltés' },
                                    { value: 10, name: 'Kérdések megválaszolása' },
                                    { value: 20, name: 'Nincs tevékenység' }
                                ]}
                                options={defaultCharts.pie2} />
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

                            <EpistoBarChart
                                title='Kurzus megtekintések alakulása'
                                options={defaultCharts.blueGreenBarChart}
                                xAxisData={[
                                    "03. 21.",
                                    "03. 22.",
                                    "03. 23.",
                                    "03. 24.",
                                    "03. 25.",
                                    "03. 26.",
                                    "03. 27.",
                                    "03. 28.",
                                ]}
                                xAxisLabel="A hét napjai"
                                yAxisLabel="Kurzus megtekintések"
                                dataset={[{
                                    name: "Jelenlegi hét",
                                    data: [[0, 90], [1, 80], [2, 65], [3, 60], [4, 55], [5, 40], [6, 30], [7, 15]]
                                }]} />
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
