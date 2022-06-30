import { useContext } from 'react';
import { useHomePageStats, useUserLearningPageStats } from '../../services/api/userStatsApiService';
import { Environment } from '../../static/Environemnt';
import { roundNumber } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import { CurrentUserContext } from '../system/AuthenticationFrame';

export const HomePageUserStats = () => {

    const { id } = useContext(CurrentUserContext);
    const { homePageStats } = useHomePageStats();

    return <EpistoGrid
        className='whall'
        auto='fill'
        gap='10'
        minColumnWidth='200px'>

        {/* total completed video count */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.title}
            value={homePageStats ? homePageStats.completedVideosLastMonth + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.suffix}
            iconPath={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
            isOpenByDefault={false} />

        {/* total playback time */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.title}
            value={homePageStats ? roundNumber(homePageStats.playbackTimeLastMonth / 60 / 60) + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.suffix}
            iconPath={Environment.getAssetUrl('images/watch3D.png')}
            isOpenByDefault={false} />

        {/* total given answer count  */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.title}
            value={homePageStats ? homePageStats.totalGivenAnswerCount + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.suffix}
            iconPath={Environment.getAssetUrl('images/answeredquestions3D.png')}
            isOpenByDefault={false} />

        {/* correct answer rate  */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.correctAnswerRate.title}
            value={homePageStats ? roundNumber(homePageStats.correctAnswerRate) + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.correctAnswerRate.suffix}
            iconPath={Environment.getAssetUrl('images/rightanswer3D.png')}
            isOpenByDefault={false} />

    </EpistoGrid>;
};