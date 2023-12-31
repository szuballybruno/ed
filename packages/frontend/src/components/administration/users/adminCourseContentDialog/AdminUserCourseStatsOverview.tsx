import { useUserCourseStatsOverviewData } from '../../../../services/api/userStatsApiService';
import { Id } from '@episto/commontypes';
import { Environment } from '../../../../static/Environemnt';
import { roundNumber } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { NoProgressChartYet } from '../../../home/NoProgressChartYet';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../../universal/charts/pie-chart/EpistoPieChart';
import { UserProgressChart } from '../../../universal/charts/line-chart/UserProgressChart';

export const AdminUserCourseStatsOverview = ({
    userId,
    courseId
}: {
    userId: Id<'User'>
    courseId: Id<'Course'>
}) => {

    const texts = translatableTexts.administration.userLearningOverviewSubpage;

    const { userCourseStatsOverviewData } = useUserCourseStatsOverviewData(userId, courseId);

    const performancePercentage = userCourseStatsOverviewData
        ? userCourseStatsOverviewData.performancePercentage
        : 0;

    const courseProgressPercentage = userCourseStatsOverviewData
        ? userCourseStatsOverviewData.courseProgressPercentage
        : 0;

    const watchingVideosPercentage = userCourseStatsOverviewData
        ? userCourseStatsOverviewData.userActivityDistributionChartData.watchingVideosPercentage
        : 0;

    const completingExamsPercentage = userCourseStatsOverviewData
        ? userCourseStatsOverviewData.userActivityDistributionChartData.completingExamsPercentage
        : 0;

    const answeringQuestionsPercentage = userCourseStatsOverviewData
        ? userCourseStatsOverviewData.userActivityDistributionChartData.answeringQuestionsPercentage
        : 0;

    const noActivityPercentage = userCourseStatsOverviewData
        ? userCourseStatsOverviewData.userActivityDistributionChartData.noActivityPercentage
        : 0;

    return <EpistoFlex2
        direction="column"
        padding="20px"
        flex="1">

        <EpistoFlex2
            flex="1">

            <EpistoFlex2
                height="350px"
                flex="1"
                align="stretch">

                <EpistoFlex2 flex="1">

                    <EpistoPieChart
                        title="Teljesítmény"
                        segments={[
                            { value: performancePercentage, name: `Teljesítmény ${performancePercentage}%` },
                            { value: 100 - performancePercentage, name: `Teljesítmény ${performancePercentage}%` }
                        ]}
                        variant="twoSegmentRedDoughnut" />
                </EpistoFlex2>
                <EpistoFlex2 flex="1">

                    <EpistoPieChart
                        title="Haladás"
                        segments={[
                            { value: courseProgressPercentage, name: '' },
                            { value: 100 - courseProgressPercentage, name: `Haladás ${roundNumber(courseProgressPercentage)}%` },
                        ]}
                        variant="twoSegmentGreenDoughnut" />
                </EpistoFlex2>
                <EpistoFlex2 flex="1">

                    <EpistoPieChart
                        title="Aktivitás eloszlása"
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
                        variant="twoSegmentGreenDoughnut" />
                </EpistoFlex2>
            </EpistoFlex2>

            <EpistoFlex2
                height="350px"
                className="roundBorders"
                flex="1"
                direction="column"
                background="var(--transparentWhite70)">

                {userCourseStatsOverviewData?.progressChartData
                    ? <UserProgressChart
                        height='350px'
                        userProgress={userCourseStatsOverviewData.progressChartData} />
                    : <NoProgressChartYet />}
            </EpistoFlex2>
        </EpistoFlex2>

        <div
            style={{
                width: '100%',
                maxWidth: '100%',
                display: 'grid',
                boxSizing: 'border-box',
                marginTop: '20px',
                gap: '10px',
                gridAutoFlow: 'row dense',
                gridTemplateColumns: 'repeat(auto-fill, minmax(23%, 1fr))',
                gridAutoRows: '160px'
            }}>
            {/* total completed video count */}
            <StatisticsCard
                title={translatableTexts.administration.userLearningOverviewSubpage.userCourseStatsOverviewDialog.statisticsCards.totalWatchedVideosCount}
                value={userCourseStatsOverviewData ? userCourseStatsOverviewData.completedVideoCount + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.completedVideosLastMonth.suffix}
                iconPath={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
                isOpenByDefault={false} />

            {/* total playback time */}
            <StatisticsCard
                title={translatableTexts.administration.userLearningOverviewSubpage.userCourseStatsOverviewDialog.statisticsCards.totalPlaybackTime}
                value={userCourseStatsOverviewData ? roundNumber(userCourseStatsOverviewData.totalSpentSeconds / 60 / 60) + '' : '0'}
                suffix={translatableTexts.misc.suffixes.hour}
                iconPath={Environment.getAssetUrl('images/watch3D.png')}
                isOpenByDefault={false} />

            {/* total given answer count */}
            <StatisticsCard
                title={translatableTexts.administration.userLearningOverviewSubpage.userCourseStatsOverviewDialog.statisticsCards.totalGivenAnswerCount}
                value={userCourseStatsOverviewData ? userCourseStatsOverviewData.answeredVideoQuestionCount + '' : '0'}
                suffix={translatableTexts.misc.suffixes.count}
                iconPath={Environment.getAssetUrl('images/answeredquestions3D.png')}
                isOpenByDefault={false} />

            {/* correct answer rate */}
            <StatisticsCard
                title={translatableTexts.administration.userLearningOverviewSubpage.userCourseStatsOverviewDialog.statisticsCards.correctAnswerRate}
                value={userCourseStatsOverviewData ? roundNumber(userCourseStatsOverviewData.correctAnswerRate) + '' : '0'}
                suffix={translatableTexts.misc.suffixes.percentage}
                iconPath={Environment.getAssetUrl('images/rightanswer3D.png')}
                isOpenByDefault={false} />
        </div>
    </EpistoFlex2>;
};
