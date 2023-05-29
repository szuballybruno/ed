import { useMemo } from 'react';
import { Environment } from '../../../static/Environemnt';
import { EpistoGrid } from '../../controls/EpistoGrid';
import StatisticsCard, { StatisticsCardProps } from '../../statisticsCard/StatisticsCard';
import { AdminStatGroup } from './AdminStatGroup';

export const UserOverviewStats = () => {

    const stats = useMemo((): StatisticsCardProps[] => [

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
            isOpenByDefault: false
        },
        /* Dropout rate */
        {
            title: 'Áttekintés javasolt',
            value: 0,
            suffix: 'esetben',
            iconPath: Environment.getAssetUrl('/images/teacherdashboard3.png'),
            isOpenByDefault: false
        },
    ], []);

    return (
        <AdminStatGroup
            id={UserOverviewStats.name}
            title="Felhasználók statisztikája"
            padding="0">

            <EpistoGrid
                auto="fill"
                minColumnWidth="50px"
                gap="10px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                padding="10px"
                flex="1">

                {stats
                    .map((statProps, index) => (
                        <StatisticsCard
                            key={index}
                            {...statProps} />
                    ))}
            </EpistoGrid>
        </AdminStatGroup>
    );
};