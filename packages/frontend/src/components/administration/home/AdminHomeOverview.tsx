import { useMemo } from 'react';
import { useAdminHomeOverviewStatsData } from '../../../services/api/userStatsApiService';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { coalesce } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import StatisticsCard, { StatisticsCardProps } from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/base_charts/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminStatGroup } from './AdminStatGroup';
import { CourseOverviewStats, useCourseOverviewStatsLogic } from './CourseOverviewStats';
import { UserOverviewStats } from './UserOverviewStats';

export const AdminHomeOverview = () => {

    const { adminOverviewStatsData } = useAdminHomeOverviewStatsData();
    const { flaggedUsers: flaggedUsersCount } = coalesce(adminOverviewStatsData, { flaggedUsers: 0 });

    const courseOverviewStatsLogic = useCourseOverviewStatsLogic({ adminOverviewStatsData });

    const weekdayLabels = useMemo(() => Object
        .values(translatableTexts.misc.daysOfWeekFromMonday), []);

    const adminHomeDetailsStatistics: StatisticsCardProps[] = [
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
            title: 'Legaktívabb napok',
            children: <EpistoBarChart
                title=""
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
    ];

    return (
        <AdminSubpageHeader
            isInverseBackground
            direction='column'>

            <EpistoFlex2
                justify='center'
                wrap="wrap">

                {/* user overview stats  */}
                <UserOverviewStats
                    flaggedUsersCount={flaggedUsersCount} />

                {/* course overview stats  */}
                <CourseOverviewStats
                    logic={courseOverviewStatsLogic} />

                {/* graphs */}
                {adminHomeDetailsStatistics
                    .map((item, index) => {

                        return <AdminStatGroup
                            title={item.title}
                            padding="0px"
                            key={index}>

                            <StatisticsCard
                                key={index}
                                flex="1"
                                {...item} />
                        </AdminStatGroup>;
                    })}
            </EpistoFlex2>
        </AdminSubpageHeader>
    );
};
