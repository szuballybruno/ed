import { Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecommendedItemQuota, useUserCourseProgressChartData } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { FlexFloat } from '../controls/FlexFloat';
import StatisticsCard, { StatisticsCardProps } from '../statisticsCard/StatisticsCard';
import { UserProgressChart } from '../universal/charts/UserProgressChart';
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
)

export const HomePageCourseStats = ({
    activeCoursesPaging,
    isSmallDesktop
}: {
    activeCoursesPaging: PagingType<UserActiveCourseDTO>,
    isSmallDesktop: boolean
}) => {

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

    const dailyVideos = (() => {

        if (isDailyStrictMode)
            return `${completedToday || 0}/${recommendedItemsPerDay}`;

        if (isDailyLightMode)
            return completedToday;

        return '0';
    })();

    const canShowChart = userProgressDataIsValid && userProgressData.dates.length > 5;

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

    useEffect(() => {

        if (!userProgressDataIsValid)
            return;
    }, [userProgressData]);

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

    return <EpistoFlex2
        mt='10px'
        flex='1'
        minHeight='450px'
        minWidth='100%'
        direction='column'>

        <EpistoFlex2
            minHeight='400px'
            width='100%'
            align='center'
            wrap="wrap"
            // flexWrap={isSmallDesktop ? 'wrap' : 'nowrap'}
            justify='space-between'
            flex='1'>

            {/* recommended  */}
            <EpistoFlex2
                flex='1'>

                {recommendedItemQuota
                    ? <Grid
                        flex="1"
                        background='transparent'
                        boxShadow="unset"
                        width={isSmallDesktop ? '100%' : '550px'}
                        minWidth={'550px'}
                        padding={isSmallDesktop ? '10px 0' : '10px'}
                        style={{
                            boxSizing: 'border-box',
                            gap: '10px',
                            gridAutoFlow: 'row dense',
                            gridTemplateColumns: isSmallDesktop ? 'auto auto auto auto' : 'repeat(auto-fill, minmax(250px, 1fr))',
                            gridAutoRows: isSmallDesktop ? '120px' : '150px'
                        }} >

                        <img
                            src={currentCourse?.coverFilePath ?? ''}
                            alt=""
                            style={{
                                height: '100%',
                                width: '100%',
                                minWidth: isSmallDesktop ? '150px' : '0',
                                objectFit: 'cover'
                            }}
                            className="roundBorders" />

                        {courseStatCards
                            .map((props, index) => <StatisticsCard
                                key={index}
                                {...props} />
                            )}

                    </Grid>
                    : <NoCourseStatsYet />}
            </EpistoFlex2>

            {/* chart item  */}
            <FlexFloat
                flex='1'
                background='transparent'
                boxShadow="unset"
                minWidth='500px'
                height={isSmallDesktop ? '400px' : '100%'}
                direction="column"
                padding="10px" >

                {canShowChart
                    ? <UserProgressChart
                        userProgress={userProgressData!} />
                    : <NoProgressChartYet />}
            </FlexFloat>
        </EpistoFlex2>


    </EpistoFlex2 >;
};
