import { useMemo } from 'react';
import { translatableTexts } from '../../../static/translatableTexts';
import StatisticsCard, { StatisticsCardProps } from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/bar-chart/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/pie-chart/EpistoPieChart';
import { AdminStatGroup } from './AdminStatGroup';

export const AdminOverviewGraphs = () => {

    const weekdayLabels = useMemo(() => Object
        .values(translatableTexts.misc.daysOfWeekFromMonday), []);

    const adminHomeDetailsStatistics: StatisticsCardProps[] = [
        /* Most active time ranges chart */
        {
            isOpenByDefault: true,
            title: 'Legaktívabb idősávok',
            children: <EpistoBarChart
                title=""
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
                    color: '#00594F',
                    data: [[0, 6], [1, 9], [2, 10], [3, 9], [4, 3], [5, 4]]
                }]}
                variant="blueGreenBarChart" />,
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
                        color: '#CEDC00',
                        data: [[0, 6], [1, 7], [2, 10], [3, 9], [4, 6], [5, 4], [6, 3]],
                    },
                    {
                        name: 'Előző hét',
                        color: '#00594F',
                        data: [[0, 4], [1, 9], [2, 8], [3, 11], [4, 10], [5, 2], [6, 5]],
                    }
                ]}
                xAxisData={weekdayLabels}
                xAxisLabel="A hét napjai"
                yAxisLabel="Belépések száma"
                yAxisLabelSuffix="db"
                variant="blueGreenBarChart" />
        },

        /* User activity distribution chart */
        {
            isOpenByDefault: true,
            title: 'Felhasználók aktivitása',
            children: <EpistoPieChart
                title=""
                isSortValues
                segments={[
                    { value: 30, name: 'Videók megtekintése' },
                    { value: 17, name: 'Vizsga / tesztkitöltés' },
                    { value: 10, name: 'Kérdések megválaszolása' },
                    { value: 20, name: 'Nincs tevékenység' }]}
                variant="redRadiusPie" />
        },

        /* Most watched courses chart */
        {
            isOpenByDefault: true,
            title: 'Legnézettebb kurzusok',
            children: <EpistoPieChart
                title=""
                isSortValues
                segments={[
                    { value: 30, name: 'Microsoft Excel Alapok' },
                    { value: 25, name: 'Microsoft Word A-Z' },
                    { value: 15, name: 'Asszertív kommunikáció a mindennapokban' },
                    { value: 13, name: 'Cyberbiztonság az irodában' },
                    { value: 17, name: 'Egyéb kurzusok' }
                ]}
                variant="donut" />
        }
    ];

    return (
        <>
            {adminHomeDetailsStatistics
                .map((item, index) => {

                    return (
                        <AdminStatGroup
                            id={`${AdminOverviewGraphs.name}-${index}}`}
                            title={item.title}
                            padding="0"
                            key={index}>

                            <StatisticsCard
                                noShadow
                                key={index}
                                margin='20px'
                                flex="1"
                                {...item} />
                        </AdminStatGroup>
                    );
                })}
        </>
    );
};