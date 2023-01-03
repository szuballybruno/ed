import { Grid } from '@chakra-ui/react';
import { UserActiveCourseDTO } from '@episto/communication';
import { useCourseProgressOverview, useUserCourseProgressChartData } from '../../services/api/userProgressApiService';
import { Environment } from '../../static/Environemnt';
import { coalesce, Formatters, PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { FlexFloat } from '../controls/FlexFloat';
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


    const { courseProgressOverviewData: recommendedItemQuota } = useCourseProgressOverview(courseId);

    const {
        completedThisWeek,
        completedToday,
        estimatedCompletionDate,
        deadlineDate,
        recommendedItemsPerDay,
        recommendedItemsPerWeek,
        tempomatMode,
    } = coalesce(recommendedItemQuota, {
        completedThisWeek: 0,
        completedToday: 0,
        deadlineDate: null,
        estimatedCompletionDate: new Date(),
        recommendedItemsPerDay: 0,
        recommendedItemsPerWeek: 0,
        tempomatMode: 'light'
    });

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

                {userProgressData.length > 0
                    ? <UserProgressChart
                        userProgress={userProgressData} />
                    : <NoProgressChartYet />}
            </FlexFloat>
        </EpistoFlex2>


    </EpistoFlex2 >;
};
