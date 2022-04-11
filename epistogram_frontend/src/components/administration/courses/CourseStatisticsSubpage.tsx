import { Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { getAssetUrl } from '../../../static/frontendHelpers';
import { StatisticsGroupType } from '../../learningInsights/LearningStatistics';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/base_charts/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';

export const CourseStatisticsSubpage = () => {

    const adminHomeDetailsStatistics = [
        {
            title: '',
            items: [

                /* Course completion rate */
                {
                    additionalInfo: {
                        change: 'up',
                        value: '32',
                        suffix: '%'
                    },
                    title: 'Kurzus teljesítési ráta',
                    value: '79',
                    suffix: '%',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic1.png'),
                    isOpenByDefault: false
                },

                /* Average time spent with learning per week */
                {
                    title: 'Átlagos tanulással töltött idő/hét',
                    value: '3.5',
                    suffix: 'óra',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic2.png'),
                    isOpenByDefault: false
                },

                /* Performance on exam */
                {
                    additionalInfo: {
                        change: 'down',
                        value: '20',
                        suffix: '%'
                    },
                    title: 'Teljesítés a vizsgákon',
                    value: '67',
                    suffix: '%',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic3.png'),
                    isOpenByDefault: false
                },

                /* Average time spent per sessions */
                {
                    title: 'Átlagosan eltöltött idő/alkalom',
                    value: '38',
                    suffix: 'perc',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic4.png'),
                    isOpenByDefault: false
                },

                /* User activity distribution chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoPieChart
                        title="Felhasználók aktivitása"
                        isSortValues
                        segments={[
                            { value: 30, name: 'Videók megtekintése' },
                            { value: 17, name: 'Vizsga / tesztkitöltés' },
                            { value: 10, name: 'Kérdések megválaszolása' },
                            { value: 20, name: 'Nincs tevékenység' }]}
                        options={defaultCharts.pie2} />
                },
            ]
        }, {
            title: '',
            items: [

                /* Most active time ranges chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoBarChart
                        title='Kurzus megtekintések alakulása'
                        options={defaultCharts.blueGreenBarChart}
                        xAxisData={[
                            '03. 21.',
                            '03. 22.',
                            '03. 23.',
                            '03. 24.',
                            '03. 25.',
                            '03. 26.',
                            '03. 27.',
                            '03. 28.',
                        ]}
                        xAxisLabel="A hét napjai"
                        yAxisLabel="Kurzus megtekintések"
                        dataset={[{
                            name: 'Jelenlegi hét',
                            data: [[0, 90], [1, 80], [2, 65], [3, 60], [4, 55], [5, 40], [6, 30], [7, 15]]
                        }]} />,
                },

                /* Average watched videos per day */
                {
                    additionalInfo: {
                        change: 'up',
                        value: '32',
                        suffix: '%'
                    },
                    title: 'Átlagosan megtekintett videók naponta',
                    value: '6',
                    suffix: 'videó',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic5.png'),
                    isOpenByDefault: false
                },

                /* Productivity rate */
                {
                    title: 'Produktivitás alakulása (produktív folyamatok aránya nő a non produktívhoz képest)',
                    value: '38',
                    suffix: '%',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic6.png'),
                    isOpenByDefault: false
                },

                /* Dropout rate */
                {
                    additionalInfo: {
                        change: 'down',
                        value: '20',
                        suffix: '%'
                    },
                    title: 'Lemorzsolódás',
                    value: '12',
                    suffix: '%',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic7.png'),
                    isOpenByDefault: false,
                },

                /* Commitment rate */
                {
                    title: 'Elköteleződés',
                    value: '73',
                    suffix: '%',
                    iconPath: getAssetUrl('images/teacherdashboardstatistic8.png'),
                    isOpenByDefault: false,
                }
            ]
        }
    ] as StatisticsGroupType[];

    return (
        <CourseAdministartionFrame
            isAnySelected={false} >

            <AdminSubpageHeader
                direction="column"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
                ]}>

                {adminHomeDetailsStatistics
                    .map((section, index) => {
                        return <Flex key={index}
                            mt="10px">

                            <Grid
                                className="whall"
                                gap="10px"
                                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                                gridAutoRows="200px"
                                gridAutoFlow="column dense">

                                {section.items.map((item, index) => {
                                    return <StatisticsCard key={index}
                                        {...item} />;
                                })}
                            </Grid>
                        </Flex>;
                    })}
            </AdminSubpageHeader >
        </CourseAdministartionFrame >
    );
};
