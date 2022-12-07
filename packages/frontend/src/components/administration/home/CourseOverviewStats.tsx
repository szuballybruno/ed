import { AdminHomePageOverviewDTO } from '@episto/communication';
import { ArrowBack, ArrowForward, FiberManualRecord } from '@mui/icons-material';
import { useMemo } from 'react';
import { EMPTY_ARRAY } from '../../../helpers/emptyArray';
import { Environment } from '../../../static/Environemnt';
import { coalesce, usePaging } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoGrid } from '../../controls/EpistoGrid';
import StatisticsCard, { StatisticsCardProps } from '../../statisticsCard/StatisticsCard';
import { AdminStatGroup } from './AdminStatGroup';

export const useCourseOverviewStatsLogic = ({ adminOverviewStatsData }: { adminOverviewStatsData: AdminHomePageOverviewDTO | null }) => {

    const { companyCourseStats } = coalesce(adminOverviewStatsData, { companyCourseStats: EMPTY_ARRAY });
    const activeCoursesPaging = usePaging({ items: companyCourseStats });

    const activeCourseData = coalesce(activeCoursesPaging.currentItem, {
        activeUsersCount: 0,
        avgCoursePerformancePercentage: 0,
        completedUsersCount: 0,
        difficultVideosCount: 0,
        questionsWaitingToBeAnswered: 0,
        suspendedUsersCount: 0,
        thumbnailUrl: '',
        title: ''
    });

    return {
        ...activeCourseData,
        prev: activeCoursesPaging.previous,
        next: activeCoursesPaging.next,
        currentIndex: activeCoursesPaging.currentIndex,
        items: companyCourseStats
    };
};

export type CourseOverviewStatsLogicType = ReturnType<typeof useCourseOverviewStatsLogic>;

export const CourseOverviewStats = ({
    logic: {
        activeUsersCount,
        avgCoursePerformancePercentage,
        completedUsersCount,
        difficultVideosCount,
        questionsWaitingToBeAnswered,
        suspendedUsersCount,
        thumbnailUrl,
        title,
        currentIndex,
        items,
        next,
        prev
    }
}: {
    logic: CourseOverviewStatsLogicType
}) => {

    const stats = useMemo((): StatisticsCardProps[] => [
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard4.png'),
            title: 'Felhasználó jelenleg',
            value: activeUsersCount,
            suffix: 'aktív',
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard5.png'),
            title: 'Végezte el a kurzust',
            value: completedUsersCount,
            suffix: 'tanuló',
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard6.png'),
            title: 'Hagyta félbe a tanfolyamot',
            value: suspendedUsersCount,
            suffix: 'tanuló',
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard7.png'),
            title: 'Átlagos teljesítmény',
            value: avgCoursePerformancePercentage
                ? Math.round(avgCoursePerformancePercentage)
                : null,
            suffix: '%'
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard8.png'),
            title: 'Nehéznek megjelölve',
            value: difficultVideosCount,
            suffix: 'videó'
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard9.png'),
            title: 'Vár válaszokra a tanártól',
            value: questionsWaitingToBeAnswered,
            suffix: 'kérdés'
        }
    ], [
        activeUsersCount,
        avgCoursePerformancePercentage,
        completedUsersCount,
        difficultVideosCount,
        questionsWaitingToBeAnswered,
        suspendedUsersCount
    ]);

    return (
        <AdminStatGroup
            padding="0"
            background="white"
            title="Kurzusok teljesítménye"
            headerContent={(
                <EpistoButton
                    variant="colored">
                    Összes kurzus
                </EpistoButton>
            )}>

            {/* active course thumbnail */}
            <EpistoFlex2
                align="center"
                padding="20px">

                <EpistoFlex2
                    flex="1">
                    <img
                        src={Environment.getAssetUrl(thumbnailUrl)}
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
                            {title}
                        </EpistoFont>
                    </EpistoFlex2>

                    {/* navigation buttons */}
                    <EpistoFlex2
                        h="30px"
                        align="center"
                        justify="center">

                        <EpistoButton
                            onClick={prev}>

                            <ArrowBack />
                        </EpistoButton>

                        {items
                            .map((_, index) => <FiberManualRecord
                                key={index}
                                style={{
                                    width: '10px',
                                    height: '8px',
                                    color: index === currentIndex
                                        ? 'black'
                                        : 'gray'
                                }} />)}

                        <EpistoButton
                            onClick={next}>

                            <ArrowForward />
                        </EpistoButton>

                    </EpistoFlex2>
                </EpistoFlex2>
            </EpistoFlex2>

            <EpistoGrid
                auto="fill"
                flex="1"
                mt="20px"
                padding="10px"
                minColumnWidth="50px"
                gap="10px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))">

                {stats
                    .map(({ iconPath, title, value, suffix }, key) => (
                        <StatisticsCard
                            key={key}
                            minWidth="180px"
                            p="10px 0"
                            iconPath={iconPath}
                            title={title}
                            value={value}
                            suffix={suffix} />
                    ))}
            </EpistoGrid>
        </AdminStatGroup>
    );
};