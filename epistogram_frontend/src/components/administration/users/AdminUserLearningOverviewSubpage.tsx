import { Flex, Image, Tooltip } from '@chakra-ui/react';
import { Add } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ButtonType } from '../../../models/types';
import { useEditUserData, useUserLearningOverviewData } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { Environment } from '../../../static/Environemnt';
import { isCurrentAppRoute } from '../../../static/frontendHelpers';
import { useRouteParams } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { FlexFloat } from '../../controls/FlexFloat';
import { NoProgressChartYet } from '../../home/NoProgressChartYet';
import { LearningCourseStatsTile } from '../../learningInsights/LearningCourseStatsTile';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditSection } from '../courses/EditSection';
import { AdminUserList } from './AdminUserList';

const UserStatisticsProgressWithLabel = (props: {
    title: string,
    value: number
}) => {

    return <Flex
        w="100%"
        mt="10px"
        h="30px"
        align="center"
        p="5px">

        <EpistoFont style={{
            minWidth: 100
        }}
            fontSize={'fontExtraSmall'}>
            {props.title}
        </EpistoFont>

        <LinearProgress
            value={props.value}
            variant="determinate"
            style={{
                width: '80%',
                color: 'red',
                margin: '0 10px',
                height: '5px'
            }} />

        <EpistoFont
            style={{
                fontWeight: 600
            }}
            fontSize={'fontSmall'}>

            {props.value}
        </EpistoFont>
    </Flex>;
};

export const AdminUserStatisticsSubpage = (props: {
    users: AdminPageUserDTO[]
}) => {

    const { users } = props;

    const usersRoute = applicationRoutes.administrationRoute.usersRoute;

    const userId = useRouteParams(applicationRoutes.administrationRoute.usersRoute.statsRoute)
        .getValue(x => x.userId, 'int');

    const { navigate2 } = useNavigation();
    const navigateToAddUser = () => navigate2(usersRoute.addRoute);

    const { userEditData } = useEditUserData(userId);
    const { userLearningOverviewData, userLearningOverviewDataError, userLearningOverviewDataStatus } = useUserLearningOverviewData(userId);

    const engagementPoints = userLearningOverviewData?.engagementPoints || 0;
    const performancePoints = Math.floor(userLearningOverviewData?.performancePercentage || 0);
    const productivityPoints = Math.floor(userLearningOverviewData?.productivityPercentage || 0);
    const reactionTimeScorePoints = userLearningOverviewData?.reactionTimeScorePoints || 0;

    const watchingVideosPercentage = userLearningOverviewData?.userActivityDistributionData.watchingVideosPercentage || 0;
    const completingExamsPercentage = userLearningOverviewData?.userActivityDistributionData.completingExamsPercentage || 0;
    const answeringQuestionsPercentage = userLearningOverviewData?.userActivityDistributionData.answeringQuestionsPercentage || 0;
    const noActivityPercentage = userLearningOverviewData?.userActivityDistributionData.noActivityPercentage || 0;


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const texts = translatableTexts.administration.userLearningOverviewSubpage;

    const bulkEditButtons = [
        {
            title: translatableTexts.misc.add,
            icon: <Add
                style={{
                    margin: '0 3px 0 0',
                    padding: '0 0 1px 0'
                }} />,
            action: () => navigateToAddUser()
        }
    ] as ButtonType[];

    return <LoadingFrame
        loadingState={userLearningOverviewDataStatus}
        error={userLearningOverviewDataError}>

        <AdminBreadcrumbsHeader
            viewSwitchChecked={isCurrentAppRoute(usersRoute)}
            viewSwitchFunction={() => navigate2(usersRoute)}
            subRouteLabel={`${userEditData?.lastName} ${userEditData?.firstName}`}>

            <AdminUserList
                users={users}
                navigationFunction={(userId) => navigate2(usersRoute.statsRoute, { userId: userId })} />

            {/* admin header */}
            <AdminSubpageHeader
                direction="column"
                tabMenuItems={
                    [
                        usersRoute.editRoute,
                        usersRoute.statsRoute,
                        usersRoute.courseContentRoute
                    ]
                        .concat(
                            userEditData?.isTeacher
                                ? usersRoute.teacherInfoRoute
                                : [])
                }
                headerButtons={bulkEditButtons}>

                {/* learning insights header */}
                <EditSection
                    isFirst
                    title={texts.sectionTitles.learningOverviewReport}
                    rightSideComponent={

                        /* set date range */
                        <Flex
                            justify="center"
                            align="center"
                            my="10px">

                            <Image
                                h="30px"
                                w="30px"
                                mr="5px"
                                src={Environment.getAssetUrl('/images/tempomatdatechange.png')}
                            />

                            <EpistoFont fontSize={'fontLarge'}
                                style={{
                                    minWidth: 150
                                }}>

                                {texts.dateRange}
                            </EpistoFont>

                            {/* Date picker tooltip */}
                            <Tooltip title={'tiptool'}
                                p="20px">

                                <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    calendarStartDay={1}
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                />
                            </Tooltip>
                        </Flex>
                    }>

                    <Flex minH="400px">

                        <Flex
                            direction="column"
                            justify="flex-start"
                            flex="4"
                            p="0 5px 0 0">

                            <Flex
                                background="var(--transparentWhite70)"
                                className="roundBorders mildShadow"
                                align="center"
                                p="10px"
                                maxH="150px"
                                flex="1"
                                position="relative">

                                <Image
                                    h={'120px'}
                                    w={'120px'}
                                    src={Environment.getAssetUrl('/images/happyfacechart.png')} />

                                <Flex
                                    direction="column"
                                    p="10px">

                                    <EpistoFont
                                        style={{
                                            fontWeight: 600
                                        }}
                                        fontSize={'fontLargePlus'}>

                                        {`${Math.floor(userLearningOverviewData?.overallPerformancePercentage || 0)}/100 Pont`}
                                    </EpistoFont>

                                    <EpistoFont
                                        style={{
                                            fontWeight: 600
                                        }}
                                        fontSize={'fontNormal14'}>

                                        {texts.userPerformanceTitles.performedWell}
                                    </EpistoFont>

                                    <EpistoFont
                                        fontSize={'fontNormal14'}>

                                        {texts.userPerformanceDescriptions.performedWell}
                                    </EpistoFont>
                                </Flex>
                            </Flex>

                            <Flex
                                w="100%"
                                mt="20px"
                                direction="column">

                                <UserStatisticsProgressWithLabel
                                    title={texts.progressLabels.engagement}
                                    value={engagementPoints} />

                                <UserStatisticsProgressWithLabel
                                    title={texts.progressLabels.performance}
                                    value={performancePoints} />

                                <UserStatisticsProgressWithLabel
                                    title={texts.progressLabels.productivity}
                                    value={productivityPoints} />

                                <UserStatisticsProgressWithLabel
                                    title={texts.progressLabels.reactionTime}
                                    value={reactionTimeScorePoints} />
                            </Flex>
                        </Flex>
                        <Flex
                            direction="column"
                            flex="5"
                            p="0 0 10px 5px">

                            <Flex h="150px">

                                <StatisticsCard
                                    iconPath={Environment.getAssetUrl('images/learningreport01.png')}
                                    value={`${Math.floor((userLearningOverviewData?.totalTimeActiveOnPlatformSeconds || 0) / 60 / 60)}`}
                                    suffix={translatableTexts.misc.suffixes.hour}
                                    style={{
                                        marginRight: 10
                                    }}
                                    title={texts.statisticsCards.activeTimeSpentOnPlatform} />

                                <StatisticsCard
                                    iconPath={Environment.getAssetUrl('images/learningreport02.png')}
                                    value={`${userLearningOverviewData?.watchedVideos || 0}`}
                                    suffix={translatableTexts.misc.suffixes.count}
                                    title={texts.statisticsCards.watchedVideosInMonth} />
                            </Flex>

                            <Flex p="10px">

                                {texts.statisticsCards.userEngagementDescription}
                            </Flex>
                        </Flex>
                    </Flex>
                </EditSection>

                <EditSection
                    title={texts.sectionTitles.coursesInMonth}>

                    <EpistoGrid
                        auto="fill"
                        gap="15"
                        minColumnWidth="250px"
                        p="10px 0">

                        {userLearningOverviewData?.inProgressCourses && userLearningOverviewData.inProgressCourses.map((course, index) => {
                            return <LearningCourseStatsTile
                                actionButtons={[{
                                    children: translatableTexts.misc.details,
                                    onClick: () => { return; }
                                }]}
                                course={course}
                                key={index} />;
                        })}
                    </EpistoGrid>
                </EditSection>

                <EditSection
                    title={texts.sectionTitles.averageProgressWithCourses}>

                    <Flex p="10px 0">
                        <div
                            style={{
                                width: '80%',
                                marginRight: '10px',
                                display: 'grid',
                                boxSizing: 'border-box',
                                gap: '10px',
                                gridAutoFlow: 'row dense',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gridAutoRows: '160px'
                            }}>

                            {/* total completed video count */}
                            <StatisticsCard
                                title={texts.statisticsCards.answeredVideoAndPractiseQuizQuestions}
                                value={`${userLearningOverviewData?.answeredVideoAndPractiseQuizQuestions || 0}`}
                                suffix={translatableTexts.misc.suffixes.count}
                                iconPath={Environment.getAssetUrl('images/learningreport03.png')}
                                isOpenByDefault={false} />

                            {/* total playback time */}
                            <StatisticsCard
                                title={texts.statisticsCards.correctAnswerRatePercentage}
                                value={`${Math.floor(userLearningOverviewData?.correctAnswerRatePercentage || 0)}`}
                                suffix={translatableTexts.misc.suffixes.percentage}
                                iconPath={Environment.getAssetUrl('images/learningreport04.png')}
                                isOpenByDefault={false} />

                            {/* total given answer count  */}
                            <StatisticsCard
                                title={texts.statisticsCards.reactionTime}
                                value={(userLearningOverviewData?.userReactionTimeDifferencePercentage || 0) > 20
                                    ? texts.statisticsCards.belowAverage
                                    : (userLearningOverviewData?.userReactionTimeDifferencePercentage || 0) < -20
                                        ? texts.statisticsCards.aboveAverage
                                        : texts.statisticsCards.average}
                                suffix={''}
                                iconPath={Environment.getAssetUrl('images/learningreport05.png')}
                                isOpenByDefault={false} />

                            {/* correct answer rate  */}
                            <StatisticsCard
                                title={texts.statisticsCards.averageWatchedVideosPerDay}
                                value={`${Math.floor(userLearningOverviewData?.averageWatchedVideosPerDay || 0)}`}
                                suffix={translatableTexts.misc.suffixes.countPerDay}
                                iconPath={Environment.getAssetUrl('images/learningreport06.png')}
                                isOpenByDefault={false} />

                        </div>
                        {/* chart item  */}
                        <FlexFloat
                            background="var(--transparentWhite70)"
                            direction="column"
                            p="10px"
                            minWidth={250}
                            style={{
                                gridColumn: 'auto / span 2',
                                gridRow: 'auto / span 2'
                            }}>

                            <NoProgressChartYet />

                        </FlexFloat>
                    </Flex>

                </EditSection>

                <EditSection title={texts.sectionTitles.activities}>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            display: 'grid',
                            boxSizing: 'border-box',
                            padding: '10px 0',
                            gap: '10px',
                            gridAutoFlow: 'row dense',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gridAutoRows: '160px'
                        }}>

                        {/* chart item  */}
                        <FlexFloat
                            background="var(--transparentWhite70)"
                            direction="column"
                            p="10px"
                            minWidth={250}
                            style={{
                                gridColumn: 'auto / span 2',
                                gridRow: 'auto / span 2'
                            }}>

                            {console.log(userLearningOverviewData?.userActivityDistributionData.watchingVideosPercentage)}
                            <EpistoPieChart
                                title=""
                                isSortValues
                                segments={[
                                    {
                                        value: watchingVideosPercentage,
                                        name: texts.activitiesPieChartTexts.watchingVideos
                                    },
                                    {
                                        value: completingExamsPercentage,
                                        name: texts.activitiesPieChartTexts.doingExamsOrTests
                                    },
                                    {
                                        value: answeringQuestionsPercentage,
                                        name: texts.activitiesPieChartTexts.answeringQuestions
                                    },
                                    {
                                        value: noActivityPercentage,
                                        name: texts.activitiesPieChartTexts.noActivity
                                    }
                                ]}
                                options={defaultCharts.pie3} />

                        </FlexFloat>

                        {/* total completed video count */}
                        <StatisticsCard
                            title={texts.statisticsCards.mostFrequentTimeRange}
                            value={`${userLearningOverviewData?.mostFrequentTimeRange || translatableTexts.misc.unknown}`}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('images/learningreport07.png')}
                            isOpenByDefault={false} />

                        {/* total playback time */}
                        <StatisticsCard
                            title={texts.statisticsCards.totalDoneExams}
                            value={`${userLearningOverviewData?.totalDoneExams || 0}`}
                            suffix={translatableTexts.misc.suffixes.count}
                            iconPath={Environment.getAssetUrl('images/learningreport08.png')}
                            isOpenByDefault={false} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            title={texts.statisticsCards.averageSessionLength}
                            value={`${Math.floor((userLearningOverviewData?.averageSessionLengthSeconds || 0) / 60)}`}
                            suffix={translatableTexts.misc.suffixes.minute}
                            iconPath={Environment.getAssetUrl('images/learningreport09.png')}
                            isOpenByDefault={false} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={texts.statisticsCards.videosToBeRepeated}
                            value={`${userLearningOverviewData?.videosToBeRepeatedCount || 0}`}
                            suffix={translatableTexts.misc.suffixes.count}
                            iconPath={Environment.getAssetUrl('images/learningreport10.png')}
                            isOpenByDefault={false} />
                    </div>
                </EditSection>
            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader >
    </LoadingFrame>;
};
