import { Grid } from '@chakra-ui/react';
import { UserActiveCourseDTO } from '@episto/communication';
import { useEffect, useState } from 'react';
import { useRecommendedItemQuota, useUserCourseProgressChartData } from '../../services/api/userProgressApiService';
import { Environment } from '../../static/Environemnt';
import { PagingType } from '../../static/frontendHelpers';
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
    const [canRenderChart, setCanRenderChart] = useState(false);

    const courseId = activeCoursesPaging?.currentItem?.courseId;

    const { userProgressData, userProgressDataIsValid } = useUserCourseProgressChartData(courseId ?? null, !!courseId);
    const currentCourse = activeCoursesPaging.currentItem;

    const { recommendedItemQuota } = useRecommendedItemQuota(courseId);

    const completedToday = recommendedItemQuota?.completedToday || 0;
    const completedThisWeek = recommendedItemQuota?.completedThisWeek || 0;

    const recommendedItemsPerDay = recommendedItemQuota?.recommendedItemsPerDay || null;
    const recommendedItemsPerWeek = recommendedItemQuota?.recommendedItemsPerWeek || null;

    const isDailyStrictMode = (recommendedItemsPerDay);
    const isDailyLightMode = (!recommendedItemsPerDay && completedToday);

    const isWeeklyStrictMode = (recommendedItemsPerWeek);
    const isWeeklyLightMode = (!recommendedItemsPerWeek && completedThisWeek);

    useEffect(() => {

        setCanRenderChart(true);
        return () => setCanRenderChart(false);
    }, []);

    const dailyVideos = (() => {

        if (isDailyStrictMode)
            return `${completedToday || 0}/${recommendedItemsPerDay}`;

        if (isDailyLightMode)
            return completedToday;

        return '0';
    })();

    const dailyLabel = (() => {

        if (isDailyStrictMode)
            return 'Teljesítve az ajánlott napi videókból';

        return 'Megtekintett videó ma';
    })();

    const weeklyVideos = (() => {

        if (isWeeklyStrictMode)
            return `${completedThisWeek}/${recommendedItemsPerWeek}`;

        if (isWeeklyLightMode)
            return completedThisWeek;

        return '0';
    })();

    const weeklyLabel = (() => {

        if (isWeeklyStrictMode)
            return 'Teljesítve az ajánlott heti videókból';

        return 'Megtekintett videó a héten';
    })();

    /*  useEffect(() => {
 
         if (!userProgressDataIsValid)
             return;
     }, [userProgressData]); */

    const estimatedCompletionDateString = recommendedItemQuota?.previsionedCompletionDate
        ? new Date(recommendedItemQuota?.previsionedCompletionDate)
            .toLocaleDateString('hu-hu', {
                month: '2-digit',
                day: '2-digit'
            }) || 'Ismeretlen'
        : 'Ismeretlen';

    const courseStatCards = [
        {
            isMobile: isSmallDesktop,
            title: dailyLabel,
            value: dailyVideos,
            suffix: isDailyStrictMode ? '' : 'db',
            iconPath: Environment.getAssetUrl('/images/dailyquota.png'),
            isOpenByDefault: false
        },
        {
            isMobile: isSmallDesktop,
            title: weeklyLabel,
            value: weeklyVideos,
            suffix: isWeeklyStrictMode ? '' : 'db',
            iconPath: Environment.getAssetUrl('/images/weeklyquota.png'),
            isOpenByDefault: false
        },
        {
            isMobile: isSmallDesktop,
            title: 'A kurzus várható befejezési ideje',
            value: estimatedCompletionDateString,
            suffix: '',
            iconPath: Environment.getAssetUrl('/images/weeklyquota.png'),
            isOpenByDefault: false
        }
    ] as StatisticsCardProps[];

    const hasProgress = userProgressData?.actualProgress ? userProgressData.actualProgress.length > 0 : false;

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
                                    flex: '1',
                                    position: 'absolute',
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
