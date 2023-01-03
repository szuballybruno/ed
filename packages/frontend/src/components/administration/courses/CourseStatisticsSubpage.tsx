import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { Environment } from '../../../static/Environemnt';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { StatisticsGroupType } from '../../learningInsights/LearningStatistics';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/bar-chart/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/pie-chart/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';

export const CourseStatisticsSubpage = () => {

    const adminHomeDetailsStatistics = useMemo((): StatisticsGroupType[] => [
        {
            title: '',
            items: [

                /* Course completion rate */
                {
                    isPreview: true,
                    additionalInfo: {
                        change: 'up',
                        value: '32',
                        suffix: '%'
                    },
                    title: 'Kurzus teljesítési ráta',
                    value: '79',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic1.png'),
                    isOpenByDefault: false
                },

                /* Average time spent with learning per week */
                {
                    isPreview: true,
                    title: 'Átlagos tanulással töltött idő/hét',
                    value: '3.5',
                    suffix: 'óra',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic2.png'),
                    isOpenByDefault: false
                },

                /* Performance on exam */
                {
                    isPreview: true,
                    additionalInfo: {
                        change: 'down',
                        value: '20',
                        suffix: '%'
                    },
                    title: 'Teljesítés a vizsgákon',
                    value: '67',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic3.png'),
                    isOpenByDefault: false
                },

                /* Average time spent per sessions */
                {
                    isPreview: true,
                    title: 'Átlagosan eltöltött idő/alkalom',
                    value: '38',
                    suffix: 'perc',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic4.png'),
                    isOpenByDefault: false
                },

                /* User activity distribution chart */
                {
                    isPreview: true,
                    isOpenByDefault: true,
                    children: <EpistoPieChart
                        title="Felhasználók aktivitása"
                        isSortValues
                        segments={[
                            { value: 30, name: 'Videók megtekintése' },
                            { value: 17, name: 'Vizsga / tesztkitöltés' },
                            { value: 10, name: 'Kérdések megválaszolása' },
                            { value: 20, name: 'Nincs tevékenység' }]}
                        variant="pie2" />
                },
            ]
        }, {
            title: '',
            items: [

                /* Most active time ranges chart */
                {
                    isPreview: true,
                    isOpenByDefault: true,
                    children: <EpistoBarChart
                        title='Kurzus megtekintések alakulása'
                        variant="blueGreenBarChart"
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
                    isPreview: true,
                    additionalInfo: {
                        change: 'up',
                        value: '32',
                        suffix: '%'
                    },
                    title: 'Átlagosan megtekintett videók naponta',
                    value: '6',
                    suffix: 'videó',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic5.png'),
                    isOpenByDefault: false
                },

                /* Productivity rate */
                {
                    isPreview: true,
                    title: 'Produktivitás alakulása (produktív folyamatok aránya nő a non produktívhoz képest)',
                    value: '38',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic6.png'),
                    isOpenByDefault: false
                },

                /* Dropout rate */
                {
                    isPreview: true,
                    additionalInfo: {
                        change: 'down',
                        value: '20',
                        suffix: '%'
                    },
                    title: 'Lemorzsolódás',
                    value: '12',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic7.png'),
                    isOpenByDefault: false,
                },

                /* Commitment rate */
                {
                    isPreview: true,
                    title: 'Elköteleződés',
                    value: '73',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic8.png'),
                    isOpenByDefault: false,
                }
            ]
        }
    ], []);

    return (
        <CourseAdministartionFrame
            isAnySelected={true} >

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
                        return <EpistoFlex2 key={index}
                            mt="10px">

                            <Grid
                                className="whall"
                                gap="10px"
                                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                                gridAutoRows="200px"
                                gridAutoFlow="column dense">

                                {section
                                    .items
                                    .map((item, index) => {
                                        return (
                                            <StatisticsCard
                                                key={index}
                                                {...item} />
                                        );
                                    })}
                            </Grid>
                        </EpistoFlex2>;
                    })}
            </AdminSubpageHeader >
        </CourseAdministartionFrame >
    );
};
