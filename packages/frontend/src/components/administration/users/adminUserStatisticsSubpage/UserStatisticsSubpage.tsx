import { Id } from '@episto/commontypes';
import 'react-datepicker/dist/react-datepicker.css';
import { ButtonType } from '../../../../models/types';
import { UserApiService } from '../../../../services/api/UserApiService1';
import { Environment } from '../../../../static/Environemnt';
import { defaultCharts } from '../../../../static/defaultChartOptions';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { FlexFloat } from '../../../controls/FlexFloat';
import { NoProgressChartYet } from '../../../home/NoProgressChartYet';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../../universal/charts/pie-chart/EpistoPieChart';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { EditSection } from '../../courses/EditSection';
import { useAdminCourseContentDialogLogic } from '../adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../adminCourseContentDialog/AdminUserCourseContentDialog';
import { UserCourses } from './UserCourses';
import { UserProgressChart } from '../../../universal/charts/line-chart/UserProgressChart';

export const AdminUserStatisticsSubpage = ({
    tabMenuItems,
    headerButtons,
    userId
}: {
    tabMenuItems: any[],
    headerButtons: ButtonType[],
    userId: Id<'User'>
}) => {

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    const { userLearningOverviewData } = UserApiService
        .useUserLearningOverviewData(userId);

    const texts = translatableTexts.administration.userLearningOverviewSubpage;

    const totalTimeActiveOnPlatformSecondsFormatted = Math
        .floor((userLearningOverviewData?.totalTimeActiveOnPlatformSeconds || 0) / 60 / 60);

    return (
        <AdminSubpageHeader
            direction="column"
            tabMenuItems={tabMenuItems}
            headerButtons={headerButtons}>

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

            <EditSection
                height="400px"
                title={'Kurzusok'}>

                <UserCourses
                    userId={userId} />
            </EditSection>

            <EditSection
                title={texts.sectionTitles.averageProgressWithCourses}>

                <EpistoFlex2
                    padding="10px 0">

                    {/* stat cards */}
                    <EpistoFlex2
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

                        {/* answered question count */}
                        <StatisticsCard
                            title={texts.statisticsCards.answeredVideoAndPractiseQuizQuestions}
                            value={`${userLearningOverviewData?.answeredVideoAndPractiseQuizQuestions || 0}`}
                            suffix={translatableTexts.misc.suffixes.count}
                            iconPath={Environment.getAssetUrl('images/learningreport03.png')} />

                        {/* correct answer percentage */}
                        <StatisticsCard
                            title={texts.statisticsCards.correctAnswerRatePercentage}
                            value={userLearningOverviewData?.correctAnsweredVideoAndPractiseQuizQuestions ? Math.floor(userLearningOverviewData?.correctAnsweredVideoAndPractiseQuizQuestions) : null}
                            suffix={translatableTexts.misc.suffixes.percentage}
                            iconPath={Environment.getAssetUrl('images/learningreport04.png')} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            title={texts.statisticsCards.reactionTime}
                            value={(userLearningOverviewData?.reactionTimeScorePoints || 0) > 20
                                ? texts.statisticsCards.belowAverage
                                : (userLearningOverviewData?.reactionTimeScorePoints || 0) < -20
                                    ? texts.statisticsCards.aboveAverage
                                    : texts.statisticsCards.average}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('images/learningreport05.png')} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={texts.statisticsCards.averageWatchedVideosPerDay}
                            value={`${Math.floor(userLearningOverviewData?.averageWatchedVideosPerDay || 0)}`}
                            suffix={translatableTexts.misc.suffixes.countPerDay}
                            iconPath={Environment.getAssetUrl('images/learningreport06.png')} />

                        <StatisticsCard
                            iconPath={Environment.getAssetUrl('images/learningreport01.png')}
                            value={totalTimeActiveOnPlatformSecondsFormatted ? totalTimeActiveOnPlatformSecondsFormatted : null}
                            suffix={translatableTexts.misc.suffixes.hour}
                            title={texts.statisticsCards.activeTimeSpentOnPlatform} />

                        <StatisticsCard
                            iconPath={Environment.getAssetUrl('images/learningreport02.png')}
                            value={userLearningOverviewData?.watchedVideos || 0}
                            suffix={translatableTexts.misc.suffixes.count}
                            title={texts.statisticsCards.totalWatchedVideoCount} />

                    </EpistoFlex2>

                    {/* chart item  */}
                    <FlexFloat
                        background="var(--transparentWhite70)"
                        direction="column"
                        padding="10px"
                        minWidth='250px'
                        style={{
                            gridColumn: 'auto / span 2',
                            gridRow: 'auto / span 2'
                        }}>

                        {userLearningOverviewData?.userProgressData
                            ? <UserProgressChart userProgress={userLearningOverviewData?.userProgressData} />
                            : <NoProgressChartYet />}

                    </FlexFloat>
                </EpistoFlex2>

            </EditSection>

            <EditSection
                title={texts.sectionTitles.activities}>

                <EpistoFlex2
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
                        minWidth='250px'
                        style={{
                            gridColumn: 'auto / span 2',
                            gridRow: 'auto / span 2'
                        }}>

                        <EpistoPieChart
                            title=""
                            variant='pie'
                            isSortValues
                            segments={[
                                {
                                    value: userLearningOverviewData?.userActivityDistributionData.watchingVideosPercentage || 0,
                                    name: texts.activitiesPieChartTexts.watchingVideos
                                },
                                {
                                    value: userLearningOverviewData?.userActivityDistributionData.completingExamsPercentage || 0,
                                    name: texts.activitiesPieChartTexts.doingExamsOrTests
                                },
                                {
                                    value: userLearningOverviewData?.userActivityDistributionData.answeringQuestionsPercentage || 0,
                                    name: texts.activitiesPieChartTexts.answeringQuestions
                                },
                                {
                                    value: userLearningOverviewData?.userActivityDistributionData.noActivityPercentage || 0,
                                    name: texts.activitiesPieChartTexts.noActivity
                                }
                            ]}
                            options={defaultCharts.pie3} />

                    </FlexFloat>
                    {/* <ActivityChart
                        data={userLearningOverviewData?.userActivityDistributionData} /> */}

                    <StatisticsCard
                        title={texts.statisticsCards.mostFrequentTimeRange}
                        value={userLearningOverviewData?.mostFrequentTimeRange || '-'}
                        suffix={''}
                        iconPath={Environment.getAssetUrl('images/learningreport07.png')}
                        isOpenByDefault={false} />

                    <StatisticsCard
                        title={texts.statisticsCards.totalDoneExams}
                        value={`${userLearningOverviewData?.totalDoneExams || 0}`}
                        suffix={translatableTexts.misc.suffixes.count}
                        iconPath={Environment.getAssetUrl('images/learningreport08.png')}
                        isOpenByDefault={false} />

                    <StatisticsCard
                        title={texts.statisticsCards.averageSessionLength}
                        value={`${Math.floor((userLearningOverviewData?.averageSessionLengthSeconds || 0) / 60)}`}
                        suffix={translatableTexts.misc.suffixes.minute}
                        iconPath={Environment.getAssetUrl('images/learningreport09.png')}
                        isOpenByDefault={false} />

                    <StatisticsCard
                        title={texts.statisticsCards.videosToBeRepeated}
                        value={`${userLearningOverviewData?.videosToBeRepeatedCount || 0}`}
                        suffix={translatableTexts.misc.suffixes.count}
                        iconPath={Environment.getAssetUrl('images/learningreport10.png')}
                        isOpenByDefault={false} />
                </EpistoFlex2>
            </EditSection>
        </AdminSubpageHeader>
    );
};
