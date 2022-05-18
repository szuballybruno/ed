import { useContext } from 'react';
import { useUserStats } from '../../services/api/userStatsApiService';
import { Environment } from '../../static/Environemnt';
import { roundNumber } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import { CurrentUserContext } from '../system/AuthenticationFrame';

export const HomePageUserStats = () => {

    const { id } = useContext(CurrentUserContext);
    const { userStats } = useUserStats(id);

    return <div
        style={{
            width: '100%',
            maxWidth: '100%',
            display: 'grid',
            boxSizing: 'border-box',
            gap: '10px',
            marginTop: '10px',
            gridAutoFlow: 'row dense',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridAutoRows: '160px'
        }}>
        {/* total completed video count */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.title}
            value={userStats ? userStats.completedVideoCount + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.suffix}
            iconPath={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
            isOpenByDefault={false} />

        {/* total playback time */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.title}
            value={userStats ? roundNumber(userStats.totalVideoPlaybackSeconds / 60 / 60) + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.suffix}
            iconPath={Environment.getAssetUrl('images/watch3D.png')}
            isOpenByDefault={false} />

        {/* total given answer count  */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.title}
            value={userStats ? userStats.totalGivenAnswerCount + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.suffix}
            iconPath={Environment.getAssetUrl('images/answeredquestions3D.png')}
            isOpenByDefault={false} />

        {/* correct answer rate  */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.correctAnswerRate.title}
            value={userStats ? roundNumber(userStats.totalCorrectAnswerRate) + '' : '0'}
            suffix={translatableTexts.homePage.statsSummary.correctAnswerRate.suffix}
            iconPath={Environment.getAssetUrl('images/rightanswer3D.png')}
            isOpenByDefault={false} />
    </div>;
};