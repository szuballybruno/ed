import { Flex, Grid } from '@chakra-ui/react';
import { ArrowBack, ArrowForward, FiberManualRecord } from '@mui/icons-material';
import { useEffect } from 'react';
import { useRecommendedItemQuota, useUserCourseProgressChartData } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '../../shared/dtos/UserActiveCourseDTO';
import { Environment } from '../../static/Environemnt';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { FlexFloat } from '../controls/FlexFloat';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import { UserProgressChart } from '../universal/charts/UserProgressChart';
import { NoProgressChartYet } from './NoProgressChartYet';

export const HomePageCourseStats = (props: {
    activeCoursesPaging: PagingType<UserActiveCourseDTO>
}) => {

    const { activeCoursesPaging } = props;

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

    return <Flex
        mt='10px'
        flex='1'
        minHeight='450px'
        minWidth='100%'
        direction='column'>

        <Flex
            minHeight='400px'
            width='100%'
            align='center'
            flexWrap='wrap'
            justify='space-between'
            flex='1'>

            <Flex
                flex='2'>

                {recommendedItemQuota
                    ? <Grid
                        background='transparent'
                        boxShadow="unset"
                        w='550px'
                        minW={'550px'}
                        p="10px"
                        style={{
                            boxSizing: 'border-box',
                            gap: '10px',
                            gridAutoFlow: 'row dense',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gridAutoRows: '160px'
                        }} >
                        <img
                            src={currentCourse?.coverFilePath ?? ''}
                            alt=""
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
                            }}
                            className="roundBorders" />

                        <StatisticsCard
                            title={'Teljesítve az ajánlott napi videókból'}
                            value={`${recommendedItemQuota?.completedToday}/${recommendedItemQuota?.recommendedItemsPerDay}` ?? '0'}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('/images/dailyquota.png')}
                            isOpenByDefault={false} />

                        <StatisticsCard
                            title={'Teljesítve az ajánlott heti videókból'}
                            value={`${recommendedItemQuota?.completedThisWeek}/${recommendedItemQuota?.recommendedItemsPerWeek}` ?? '0'}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
                            isOpenByDefault={false} />

                        <StatisticsCard
                            title={'A kurzus várható befejezési ideje'}
                            value={estimatedCompletionDateString}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
                            isOpenByDefault={false} />

                    </Grid>
                    : <Flex
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
                    </Flex>}
            </Flex>




            {/* chart item  */}
            <FlexFloat
                flex='3'
                background='transparent'
                boxShadow="unset"
                minW='500px'
                h='100%'
                direction="column"
                p="10px" >

                {(userProgressDataIsValid && userProgressData.dates.length > 5)
                    ? <UserProgressChart userProgress={userProgressData!} />
                    : <NoProgressChartYet />}
            </FlexFloat>
        </Flex>

        {/* navigation buttons */}
        <Flex
            flex='1'
            h="30px"
            mt='10px'
            align="center"
            justify="center">

            <EpistoButton onClick={() => activeCoursesPaging.previous()}>
                <ArrowBack />
            </EpistoButton>

            {activeCoursesPaging
                .items
                .map((x, index) => <FiberManualRecord
                    key={index}
                    style={{
                        width: '10px',
                        height: '8px',
                        color: index === activeCoursesPaging.currentIndex ? 'black' : 'gray'
                    }} />)}

            <EpistoButton onClick={() => activeCoursesPaging.next()}>
                <ArrowForward />
            </EpistoButton>

        </Flex>
    </Flex >;
};
