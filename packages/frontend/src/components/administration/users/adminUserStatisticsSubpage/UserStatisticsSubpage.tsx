import { Id } from '@episto/commontypes';
import 'react-datepicker/dist/react-datepicker.css';
import { ButtonType } from '../../../../models/types';
import { UserApiService } from '../../../../services/api/UserApiService1';
import { Environment } from '../../../../static/Environemnt';
import { coalesce } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { FlexFloat } from '../../../controls/FlexFloat';
import { NoProgressChartYet } from '../../../home/NoProgressChartYet';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { EditSection } from '../../courses/EditSection';
import { useAdminCourseContentDialogLogic } from '../adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../adminCourseContentDialog/AdminUserCourseContentDialog';
import { ActivityChart } from './ActivityChart';
import { UserCourses } from './UserCourses';

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

    const {
        answeredVideoAndPractiseQuizQuestions,
        correctAnswerRatePercentage,
        totalTimeActiveOnPlatformSeconds,
        watchedVideos
    } = coalesce(userLearningOverviewData, {
        answeredVideoAndPractiseQuizQuestions: 0,
        correctAnswerRatePercentage: 0,
        totalTimeActiveOnPlatformSeconds: 0,
        watchedVideos: 0
    });

    const totalTimeActiveOnPlatformSecondsFormatted = Math
        .floor(totalTimeActiveOnPlatformSeconds / 60 / 60);

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
                            value={answeredVideoAndPractiseQuizQuestions}
                            suffix={translatableTexts.misc.suffixes.count}
                            iconPath={Environment.getAssetUrl('images/learningreport03.png')} />

                        {/* correct answer percentage */}
                        <StatisticsCard
                            title={texts.statisticsCards.correctAnswerRatePercentage}
                            value={Math.floor(correctAnswerRatePercentage)}
                            suffix={translatableTexts.misc.suffixes.percentage}
                            iconPath={Environment.getAssetUrl('images/learningreport04.png')} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            isPreview
                            title={texts.statisticsCards.reactionTime}
                            value={(userLearningOverviewData?.userReactionTimeDifferencePercentage || 0) > 20
                                ? texts.statisticsCards.belowAverage
                                : (userLearningOverviewData?.userReactionTimeDifferencePercentage || 0) < -20
                                    ? texts.statisticsCards.aboveAverage
                                    : texts.statisticsCards.average}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('images/learningreport05.png')} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            isPreview
                            title={texts.statisticsCards.averageWatchedVideosPerDay}
                            value={`${Math.floor(userLearningOverviewData?.averageWatchedVideosPerDay || 0)}`}
                            suffix={translatableTexts.misc.suffixes.countPerDay}
                            iconPath={Environment.getAssetUrl('images/learningreport06.png')} />

                        <StatisticsCard
                            iconPath={Environment.getAssetUrl('images/learningreport01.png')}
                            value={totalTimeActiveOnPlatformSecondsFormatted}
                            suffix={translatableTexts.misc.suffixes.hour}
                            title={texts.statisticsCards.activeTimeSpentOnPlatform} />

                        <StatisticsCard
                            iconPath={Environment.getAssetUrl('images/learningreport02.png')}
                            value={watchedVideos}
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

                        <NoProgressChartYet />

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
                    <ActivityChart
                        data={userLearningOverviewData} />

                    <StatisticsCard
                        isPreview
                        title={texts.statisticsCards.mostFrequentTimeRange}
                        value={`${userLearningOverviewData?.mostFrequentTimeRange || translatableTexts.misc.unknown}`}
                        suffix={''}
                        iconPath={Environment.getAssetUrl('images/learningreport07.png')}
                        isOpenByDefault={false} />

                    <StatisticsCard
                        isPreview
                        title={texts.statisticsCards.totalDoneExams}
                        value={`${userLearningOverviewData?.totalDoneExams || 0}`}
                        suffix={translatableTexts.misc.suffixes.count}
                        iconPath={Environment.getAssetUrl('images/learningreport08.png')}
                        isOpenByDefault={false} />

                    <StatisticsCard
                        isPreview
                        title={texts.statisticsCards.averageSessionLength}
                        value={`${Math.floor((userLearningOverviewData?.averageSessionLengthSeconds || 0) / 60)}`}
                        suffix={translatableTexts.misc.suffixes.minute}
                        iconPath={Environment.getAssetUrl('images/learningreport09.png')}
                        isOpenByDefault={false} />

                    <StatisticsCard
                        isPreview
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
