import { Grid } from '@chakra-ui/layout';
import { ArrowBack, ArrowForward, FiberManualRecord } from '@mui/icons-material';
import { ReactNode } from 'react';
import { useAdminHomeOverviewStatsData } from '../../../services/api/userStatsApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { Environment } from '../../../static/Environemnt';
import { usePaging } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { StatisticsGroupType } from '../../learningInsights/LearningStatistics';
import StatisticsCard, { StatisticsCardProps } from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/base_charts/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';


const AdminSectionWithButton = (props: {
    title: string,
    children?: ReactNode,
    headerContent?: ReactNode
} & EpistoFlex2Props) => {
    const { title, children, headerContent, ...css } = props;
    return <EpistoFlex2
        direction="column"
        className="roundBorders"
        background="var(--transparentWhite70)"
        p="20px"
        {...css}>

        <EpistoFlex2
            h="40px"
            w="100%"
            align="center"
            justify="space-between">

            <EpistoFont>
                {title}
            </EpistoFont>

            {headerContent}
        </EpistoFlex2>

        {children}
    </EpistoFlex2>;
};

export const AdminHomeOverview = () => {

    const { adminHomePageOverviewStats, adminHomePageOverviewStatsError, adminHomePageOverviewStatsStatus } = useAdminHomeOverviewStatsData();
    const courses = adminHomePageOverviewStats?.companyCourseStats ? adminHomePageOverviewStats.companyCourseStats : [];
    const activeCoursesPaging = usePaging({ items: courses });
    const currentCourse = adminHomePageOverviewStats?.companyCourseStats[activeCoursesPaging.currentIndex];

    const weekdayLabels = Object.values(translatableTexts.misc.daysOfWeekFromMonday);

    const stats = [

        /* Average performance */
        {
            title: 'Összesített teljesítmény',
            value: '3.5',
            suffix: 'óra',
            iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic2.png'),
            isOpenByDefault: false
        },
        /* Average time spent with learning per week */
        {
            title: 'Átlagos tanulással töltött idő/hét',
            value: '3.5',
            suffix: 'óra',
            iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic2.png'),
            isOpenByDefault: false
        },
        /* Average time spent per sessions */
        {
            title: 'Átlagosan eltöltött idő/alkalom',
            value: '38',
            suffix: 'perc',
            iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic4.png'),
            isOpenByDefault: false
        },
        /* Dropout rate */
        {
            title: 'Lemorzsolódás',
            value: '12',
            suffix: '%',
            iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic7.png'),
            isOpenByDefault: false,
        },




    ] as StatisticsCardProps[];

    const adminHomeDetailsStatistics = [
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
                        xAxisData={weekdayLabels}
                        xAxisLabel="A hét napjai"
                        yAxisLabel="Belépések száma"
                        yAxisLabelSuffix="db"
                        options={defaultCharts.blueGreenBarChart} />
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

    const { navigateToHref } = useNavigation();

    return <AdminSubpageHeader
        isInverseBackground
        direction='column'>
        <EpistoFlex2
            justify='center'
            flex='1'>

            <EpistoFlex2 flex="3"
                direction="column"
                mr='10px'>

                <AdminSectionWithButton
                    title="Felhasználók"
                    mt="10px"
                    headerContent={
                        <EpistoButton
                            variant="colored">
                            Összes hallgató
                        </EpistoButton>}>

                    <EpistoGrid
                        auto="fill"
                        mt="20px"
                        h="130px"
                        minColumnWidth="50px"
                        gap="10px"
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))">

                        <StatisticsCard
                            additionalFunction={() => { throw new Error('Not implemented!'); }}
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard3.png')}
                            title="Áttekintés javasolt"
                            value={adminHomePageOverviewStats?.flaggedUsers}
                            suffix="esetben" />
                    </EpistoGrid>

                </AdminSectionWithButton>



                <EpistoGrid
                    auto="fill"
                    mt="10px"
                    height='100%'
                    minColumnWidth="50px"
                    gap="10px"
                    gridTemplateColumns="repeat(2, minmax(0, 1fr))">

                    {stats.map((x, index) => <StatisticsCard
                        key={index}
                        {...x} />)}
                </EpistoGrid>
            </EpistoFlex2>

            <EpistoFlex2
                flex="2"
                h="fit-content">
                <AdminSectionWithButton
                    m="10px 0 0 0"
                    flex="1"
                    title="Kurzusok teljesítménye"
                    headerContent={
                        <EpistoButton
                            variant="colored">
                            Összes kurzus
                        </EpistoButton>}>

                    {/* active course thumbnail */}
                    <EpistoFlex2
                        align="center"
                        padding="20px">

                        <EpistoFlex2
                            flex="1">
                            <img
                                src={Environment.getAssetUrl(currentCourse?.thumbnailUrl ? currentCourse.thumbnailUrl : '')}
                                alt=""
                                style={{
                                    height: '100%',
                                    maxWidth: '200px',
                                    objectFit: 'contain'
                                }}
                                className="roundBorders" />
                        </EpistoFlex2>

                        <EpistoFlex2
                            flex="1"
                            direction="column"
                            p="20px">

                            <EpistoFlex2
                                h="30px"
                                align="center"
                                justify="center">
                                <EpistoFont>
                                    {currentCourse?.title}
                                </EpistoFont>
                            </EpistoFlex2>

                            {/* navigation buttons */}
                            <EpistoFlex2
                                h="30px"
                                align="center"
                                justify="center">

                                <EpistoButton onClick={() => activeCoursesPaging.previous()}>

                                    <ArrowBack />
                                </EpistoButton>

                                {activeCoursesPaging
                                    .items
                                    .map((x, index) => <FiberManualRecord
                                        key={index}
                                        style={{
                                            width: '10px',
                                            height: '8px',
                                            color: index === activeCoursesPaging.currentIndex ? 'black' : 'gray'
                                        }} />)}

                                <EpistoButton onClick={() => activeCoursesPaging.next()}>

                                    <ArrowForward />
                                </EpistoButton>

                            </EpistoFlex2>
                        </EpistoFlex2>
                    </EpistoFlex2>

                    <EpistoGrid
                        auto="fill"
                        mt="20px"
                        minColumnWidth="50px"
                        gap="10px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))">

                        <StatisticsCard
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard4.png')}
                            title="Felhasználó jelenleg"
                            value={currentCourse?.activeUsersCount}
                            suffix="aktív" />

                        <StatisticsCard
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard5.png')}
                            title="Végezte el a kurzust"
                            value={currentCourse?.completedUsersCount}
                            suffix="tanuló" />

                        <StatisticsCard
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard6.png')}
                            title="Hagyta félbe a tanfolyamot"
                            value={currentCourse?.suspendedUsersCount}
                            suffix="tanuló" />

                        <StatisticsCard
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard7.png')}
                            title="Átlagos teljesítmény"
                            value={currentCourse?.avgCoursePerformancePercentage
                                ? Math.round(currentCourse.avgCoursePerformancePercentage)
                                : null}
                            suffix="%" />

                        <StatisticsCard
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard8.png')}
                            title="Nehéznek megjelölve"
                            value={currentCourse?.difficultVideosCount}
                            suffix="videó" />

                        <StatisticsCard
                            minWidth="180px"
                            p="10px 0"
                            iconPath={Environment.getAssetUrl('/images/teacherdashboard9.png')}
                            title="Vár válaszokra a tanártól"
                            value={currentCourse?.questionsWaitingToBeAnswered}
                            suffix="kérdés" />
                    </EpistoGrid>
                </AdminSectionWithButton>
            </EpistoFlex2>
        </EpistoFlex2>

        {adminHomeDetailsStatistics
            .map((section, index) => {

                return <EpistoFlex2
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
                </EpistoFlex2>;
            })}
    </AdminSubpageHeader>;
};
