import { Flex } from '@chakra-ui/react';
import { UserCourseProgressChartDTO } from '../../../shared/dtos/UserCourseProgressChartDTO';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { Environment } from '../../../static/Environemnt';
import { roundNumber } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { NoProgressChartYet } from '../../home/NoProgressChartYet';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { UserProgressChart } from '../../universal/charts/UserProgressChart';

export const AdminUserCourseStatsOverview = (props: {
    userStats: {
        userProgressData: UserCourseProgressChartDTO,
        completedVideoCount: number,
        totalVideoPlaybackSeconds: number,
        totalGivenAnswerCount: number,
        totalCorrectAnswerRate: number
    }
}) => {

    const { userStats } = props;

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
                            { value: 70, name: 'Teljesítmény 70%' },
                            { value: 30, name: '' },
                        ]}
                        options={defaultCharts.twoSegmentGreenDoughnut} />
                </Flex>
                <Flex flex="1">

                    <EpistoPieChart
                        title="Haladás"
                        segments={[
                            { value: 20, name: '' },
                            { value: 80, name: 'Haladás 20%' },
                        ]}
                        options={defaultCharts.twoSegmentRedDoughnut} />
                </Flex>
                <Flex flex="1">

                    <EpistoPieChart
                        title="Aktivitás eloszlása"
                        isSortValues
                        segments={[
                            { value: 30, name: '' },
                            { value: 17, name: '' },
                            { value: 10, name: '' },
                            { value: 20, name: '' }
                        ]}
                        options={defaultCharts.pie} />
                </Flex>
            </Flex>

            <Flex
                h="350px"
                className="roundBorders"
                flex="1"
                direction="column"
                background="var(--transparentWhite70)">

                {userStats.userProgressData && userStats.userProgressData.days.length > 0
                    ? <UserProgressChart userProgress={userStats.userProgressData} />
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
            {/* 
            {/* total completed video count 
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.title}
                value={userStats ? userStats.completedVideoCount + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.suffix}
                iconPath={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
                isOpenByDefault={false} />

            {/* total playback time 
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.title}
                value={userStats ? roundNumber(userStats.totalVideoPlaybackSeconds / 60 / 60) + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.suffix}
                iconPath={Environment.getAssetUrl('images/watch3D.png')}
                isOpenByDefault={false} />

            {/* total given answer count  
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.title}
                value={userStats ? userStats.totalGivenAnswerCount + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.suffix}
                iconPath={Environment.getAssetUrl('images/answeredquestions3D.png')}
                isOpenByDefault={false} />

            {/* correct answer rate  
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.correctAnswerRate.title}
                value={userStats ? roundNumber(userStats.totalCorrectAnswerRate) + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.correctAnswerRate.suffix}
                iconPath={Environment.getAssetUrl('images/rightanswer3D.png')}
                isOpenByDefault={false} /> */}
        </div>
    </Flex>;
};