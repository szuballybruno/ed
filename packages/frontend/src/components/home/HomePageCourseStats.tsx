import { Grid } from '@chakra-ui/react';
import { UserActiveCourseDTO } from '@episto/communication';
import { useEffect, useState } from 'react';
import { useCourseProgressOverview, useUserCourseProgressChartData } from '../../services/api/userProgressApiService';
import { Environment } from '../../static/Environemnt';
import { coalesce, Formatters, PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import StatisticsCard, { StatisticsCardProps } from '../statisticsCard/StatisticsCard';
import { UserProgressChart } from '../universal/charts/line-chart/UserProgressChart';
import { NoProgressChartYet } from './NoProgressChartYet';

const NoCourseStatsYet = () => (
    <EpistoFlex2
        align='center'
        justify='center'
        textAlign='center'
        style={{
            boxSizing: 'border-box',
            gap: '10px',
            gridAutoFlow: 'row dense',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gridAutoRows: '160px'
        }}>

        Itt fognak megjelenni a kurzussal kapcsolatos statisztikáid, amint elkezdesz egy új kurzust
    </EpistoFlex2>
);

export const HomePageCourseStats = ({
    activeCoursesPaging,
    isSmallDesktop
}: {
    activeCoursesPaging: PagingType<UserActiveCourseDTO>,
    isSmallDesktop: boolean
}) => {

    const courseId = activeCoursesPaging?.currentItem?.courseId;

    const { userProgressData } = useUserCourseProgressChartData(courseId ?? null, !!courseId);
    const currentCourse = activeCoursesPaging.currentItem;
    const [canRenderChart, setCanRenderChart] = useState(false);

    const { courseProgressOverviewData: recommendedItemQuota } = useCourseProgressOverview(courseId);

    const {
        completedThisWeek,
        completedToday,
        estimatedCompletionDate,
    } = coalesce(recommendedItemQuota, {
        completedThisWeek: 0,
        completedToday: 0,
        estimatedCompletionDate: new Date(),
    });

    useEffect(() => {

        setCanRenderChart(true);
        return () => setCanRenderChart(false);
    }, []);

    const courseStatCards = [
        {
            isMobile: isSmallDesktop,
            title: 'Megtekintett videó ma',
            value: completedToday,
            suffix: 'db',
            iconPath: Environment.getAssetUrl('/images/dailyquota.png'),
            isOpenByDefault: false
        },
        {
            isMobile: isSmallDesktop,
            title: 'Megtekintett videó a héten',
            value: completedThisWeek,
            suffix: 'db',
            iconPath: Environment.getAssetUrl('/images/weeklyquota.png'),
            isOpenByDefault: false
        },
        {
            isMobile: isSmallDesktop,
            title: 'A kurzus várható befejezési ideje',
            value: estimatedCompletionDate
                ? Formatters.formatDate(estimatedCompletionDate)
                : 'Ismeretlen',
            suffix: '',
            iconPath: Environment.getAssetUrl('/images/weeklyquota.png'),
            isOpenByDefault: false
        }
    ] as StatisticsCardProps[];

    const hasProgress = userProgressData.length > 0;

    return (
        <EpistoFlex2
            id={HomePageCourseStats.name}
            align='center'
            wrap="wrap"
            justify='space-between'
            overflow="hidden"
            flex='1'>

            {/* recommended  */}
            <EpistoFlex2
                id="Cards"
                align="center"
                flex='1'>

                {/* stats */}
                {recommendedItemQuota && (
                    <Grid
                        id="Grid"
                        flex="1"
                        minWidth="500px"
                        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">

                        <EpistoFlex2
                            minWidth="200px"
                            minHeight="150px"
                            margin="5px"
                            position="relative">

                            <img
                                src={currentCourse?.coverFilePath ?? ''}
                                alt=""
                                style={{
                                    flex: "1",
                                    position: "absolute",
                                    objectFit: 'cover'
                                }}
                                className="roundBorders whall" />
                        </EpistoFlex2>

                        {courseStatCards
                            .map((props, index) => (
                                <StatisticsCard
                                    key={index}
                                    margin="5px"
                                    minWidth="200px"
                                    minHeight="150px"
                                    {...props} />
                            ))}
                    </Grid>
                )}

                {/* no stats */}
                {!recommendedItemQuota && <NoCourseStatsYet />}
            </EpistoFlex2>

            {/* chart item  */}
            <EpistoFlex2
                id="ChartHost"
                minWidth='500px'
                minHeight='400px'
                paddingTop="10px"
                flex="1">

                {/* progress chart  */}
                {(hasProgress && canRenderChart) && <UserProgressChart
                    overflow="hidden"
                    flex="1"
                    userProgress={userProgressData} />}

                {/* no progress yet */}
                {!hasProgress && <NoProgressChartYet />}
            </EpistoFlex2>
        </EpistoFlex2 >
    );
};
