import { Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecommendedItemQuota, useUserCourseProgressChartData } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { FlexFloat } from '../controls/FlexFloat';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import { UserProgressChart } from '../universal/charts/UserProgressChart';
import { NoProgressChartYet } from './NoProgressChartYet';

export const HomePageCourseStats = (props: {
    activeCoursesPaging: PagingType<UserActiveCourseDTO>,
    isSmallDesktop: boolean
}) => {

    const { activeCoursesPaging, isSmallDesktop } = props;

    const courseId = activeCoursesPaging?.currentItem?.courseId;

    const { userProgressData, userProgressDataIsValid } = useUserCourseProgressChartData(courseId ?? null, !!courseId);
    const currentCourse = activeCoursesPaging.currentItem;
    const { recommendedItemQuota } = useRecommendedItemQuota(courseId);

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
            flexWrap={isSmallDesktop ? 'wrap' : 'nowrap'}
            justify='space-between'
            flex='1'>

            <EpistoFlex2
                flex='2'>

                {recommendedItemQuota
                    ? <Grid
                        background='transparent'
                        boxShadow="unset"
                        w={isSmallDesktop ? '100%' : '550px'}
                        minW={'550px'}
                        p={isSmallDesktop ? '10px 0' : '10px'}
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

                        <StatisticsCard
                            isMobile={isSmallDesktop}
                            title={'Teljesítve az ajánlott napi videókból'}
                            value={`${recommendedItemQuota?.completedToday}/${recommendedItemQuota?.recommendedItemsPerDay}` ?? '0'}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('/images/dailyquota.png')}
                            isOpenByDefault={false} />

                        <StatisticsCard
                            isMobile={isSmallDesktop}
                            title={'Teljesítve az ajánlott heti videókból'}
                            value={`${recommendedItemQuota?.completedThisWeek}/${recommendedItemQuota?.recommendedItemsPerWeek}` ?? '0'}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
                            isOpenByDefault={false} />

                        <StatisticsCard
                            isMobile={isSmallDesktop}
                            title={'A kurzus várható befejezési ideje'}
                            value={estimatedCompletionDateString}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
                            isOpenByDefault={false} />

                    </Grid>
                    : <EpistoFlex2
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
                    </EpistoFlex2>}
            </EpistoFlex2>

            {/* chart item  */}
            <FlexFloat
                flex='3'
                background='transparent'
                boxShadow="unset"
                minW='500px'
                h={isSmallDesktop ? '400px' : '100%'}
                direction="column"
                p="10px" >

                {(userProgressDataIsValid && userProgressData.dates.length > 5)
                    ? <UserProgressChart userProgress={userProgressData!} />
                    : <NoProgressChartYet />}
            </FlexFloat>
        </EpistoFlex2>


    </EpistoFlex2 >;
};
