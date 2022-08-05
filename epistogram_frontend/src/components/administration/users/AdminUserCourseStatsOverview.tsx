import { Flex } from '@chakra-ui/react';
import { useUserCourseStatsOverviewData } from '../../../services/api/userStatsApiService';
import { Id } from '../../../shared/types/versionId';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { Environment } from '../../../static/Environemnt';
import { roundNumber } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { NoProgressChartYet } from '../../home/NoProgressChartYet';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { UserProgressChart } from '../../universal/charts/UserProgressChart';

export const AdminUserCourseStatsOverview = (props: {
    userId: Id<'User'>
    courseId: Id<'Course'>
}) => {

    const {
        userId,
        courseId
    } = props;

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

    return <Flex
        direction="column"
        p="20px"
        flex="1">

        <Flex
            flex="1">

            <Flex
                h="350px"
                flex="1"
                align="stretch">

                <Flex flex="1">

                    <EpistoPieChart
                        title="Teljesítmény"
                        segments={[
                            { value: performancePercentage, name: `Teljesítmény ${performancePercentage}%` },
                            { value: 100 - performancePercentage, name: '' },
                        ]}
                        options={defaultCharts.twoSegmentGreenDoughnut} />
                </Flex>
                <Flex flex="1">

                    <EpistoPieChart
                        title="Haladás"
                        segments={[
                            { value: courseProgressPercentage, name: '' },
                            { value: 100 - courseProgressPercentage, name: `Haladás ${roundNumber(courseProgressPercentage)}%` },
                        ]}
                        options={defaultCharts.twoSegmentRedDoughnut} />
                </Flex>
                <Flex flex="1">

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
                </Flex>
            </Flex>

            <Flex
                h="350px"
                className="roundBorders"
                flex="1"
                direction="column"
                background="var(--transparentWhite70)">

                {userCourseStatsOverviewData
                    ? <UserProgressChart userProgress={userCourseStatsOverviewData.progressChartData} />
                    : <NoProgressChartYet />}
            </Flex>
        </Flex>

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
                value={userCourseStatsOverviewData ? userCourseStatsOverviewData.totalCompletedItemCount + '' : '0'}
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
    </Flex>;
};