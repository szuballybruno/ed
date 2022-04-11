import { Flex, Grid } from '@chakra-ui/react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { getAssetUrl } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { StatisticsGroupType } from '../../learningInsights/LearningStatistics';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/base_charts/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const AdminHomeDetails = () => {

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

                /* Most active days chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoBarChart
                        title="Legaktívabb napok"
                        dataset={[
                            {
                                name: 'Jelenlegi hét',
                                data: [[0, 6], [1, 7], [2, 10], [3, 9], [4, 6], [5, 4], [6, 3]],
                            },
                            {
                                name: 'Előző hét',
                                data: [[0, 4], [1, 9], [2, 8], [3, 11], [4, 10], [5, 2], [6, 5]],
                            }
                        ]}
                        xAxisData={translatableTexts.misc.daysOfWeekFromMonday}
                        xAxisLabel="A hét napjai"
                        yAxisLabel="Belépések száma"
                        yAxisLabelSuffix="db"
                        options={defaultCharts.blueGreenBarChart} />
                }
            ]
        },
        {
            title: '',
            items: [

                /* Most active time ranges chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoBarChart
                        title="Legaktívabb idősávok"
                        xAxisData={[
                            '6:00',
                            '9:00',
                            '12:00',
                            '15:00',
                            '18:00',
                            '21:00',
                        ]}
                        xAxisLabel="Idősávok"
                        yAxisLabel="Belépések száma"
                        yAxisLabelSuffix="db"
                        dataset={[{
                            name: 'Jelenlegi hét',
                            data: [[0, 6], [1, 9], [2, 10], [3, 9], [4, 3], [5, 4]]
                        }]}
                        options={defaultCharts.blueGreenBarChart} />,
                },

                /* Average watched videos per day */
                {
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
        }, {
            title: '',
            items: [

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
                        options={defaultCharts.redRadiusPie} />
                },

                /* Most watched courses chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoPieChart
                        title="Legnézettebb kurzusok"
                        isSortValues
                        segments={[
                            { value: 30, name: 'Microsoft Excel Alapok' },
                            { value: 25, name: 'Microsoft Word A-Z' },
                            { value: 15, name: 'Asszertív kommunikáció a mindennapokban' },
                            { value: 13, name: 'Cyberbiztonság az irodában' },
                            { value: 17, name: 'Egyéb kurzusok' }
                        ]}
                        options={defaultCharts.donut} />
                }
            ]
        }
    ] as StatisticsGroupType[];

    return <AdminSubpageHeader
        direction="column"
        isInverseBackground
        tabMenuItems={[{
            route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.overviewRoute.title
        }, {
            route: applicationRoutes.administrationRoute.homeRoute.detailsRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.detailsRoute.title
        }]}>

        {adminHomeDetailsStatistics
            .map((section, index) => {

                return <Flex
                    key={index}
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
                                return <StatisticsCard
                                    key={index}
                                    {...item} />;
                            })}
                    </Grid>
                </Flex>;
            })}
    </AdminSubpageHeader >;
};