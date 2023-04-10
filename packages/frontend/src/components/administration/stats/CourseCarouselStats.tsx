import { ArrowBack, ArrowForward, FiberManualRecord } from '@mui/icons-material';
import { Id } from '@episto/x-core';
import { useMemo } from 'react';
import { AdminApiService } from '../../../services/api/AdminApiService';
import { Environment } from '../../../static/Environemnt';
import { coalesce, usePaging } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoGrid } from '../../controls/EpistoGrid';
import StatisticsCard, { StatisticsCardProps } from '../../statisticsCard/StatisticsCard';
import { AdminStatGroup } from './AdminStatGroup';

export const useCourseOverviewStatsLogic = ({ activeCompanyId }: { activeCompanyId: Id<'Company'> | null }) => {

    const { adminOverviewStatsDatas } = AdminApiService
        .useAdminCourseStatCarouselDatas(activeCompanyId);

    const activeCoursesPaging = usePaging({ items: adminOverviewStatsDatas });

    const activeCourseData = coalesce(activeCoursesPaging.currentItem, {
        activeUserCount: 0,
        courseCompletionCount: 0,
        coverFilePath: '',
        courseTitle: ''
    });

    return {
        ...activeCourseData,
        prev: activeCoursesPaging.previous,
        next: activeCoursesPaging.next,
        currentIndex: activeCoursesPaging.currentIndex,
        items: adminOverviewStatsDatas
    };
};

export type CourseOverviewStatsLogicType = ReturnType<typeof useCourseOverviewStatsLogic>;

export const CourseCarouselStats = ({
    logic: {
        currentIndex,
        activeUserCount,
        courseCompletionCount,
        courseTitle,
        coverFilePath,
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
            value: activeUserCount,
            suffix: 'aktív'
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard5.png'),
            title: 'Végezte el a kurzust',
            value: courseCompletionCount,
            suffix: 'tanuló'
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard6.png'),
            title: 'Hagyta félbe a tanfolyamot',
            value: 0,
            suffix: 'tanuló',
            isPreview: true
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard7.png'),
            title: 'Átlagos teljesítmény',
            value: 0,
            suffix: '%',
            isPreview: true
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard8.png'),
            title: 'Nehéznek megjelölve',
            value: 0,
            suffix: 'videó',
            isPreview: true
        },
        {
            iconPath: Environment.getAssetUrl('/images/teacherdashboard9.png'),
            title: 'Vár válaszokra a tanártól',
            value: 0,
            suffix: 'kérdés',
            isPreview: true
        }
    ], [
        courseCompletionCount,
        activeUserCount
    ]);

    return (
        <AdminStatGroup
            id={CourseCarouselStats.name}
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
                        src={coverFilePath}
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
                    padding="20px">

                    <EpistoFlex2
                        height="30px"
                        align="center"
                        justify="center">

                        <EpistoFont>
                            {courseTitle}
                        </EpistoFont>
                    </EpistoFlex2>

                    {/* navigation buttons */}
                    <EpistoFlex2
                        height="30px"
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
                    .map((props, key) => (
                        <StatisticsCard
                            key={key}
                            minWidth="180px"
                            {...props} />
                    ))}
            </EpistoGrid>
        </AdminStatGroup>
    );
};