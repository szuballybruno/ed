import {useContext} from 'react';
import {useHomePageStats} from '../../services/api/userStatsApiService';
import {Environment} from '../../static/Environemnt';
import {translatableTexts} from '../../static/translatableTexts';
import {EpistoGrid} from '../controls/EpistoGrid';
import {getProgressFromLagBehind} from '../learningInsights/LearningStatistics';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import {CurrentUserContext} from '../system/AuthenticationFrame';

export const HomePageUserStats = () => {

    const { id } = useContext(CurrentUserContext);
    const { homePageStats } = useHomePageStats();

    return <EpistoGrid
        className='whall'
        auto='fill'
        gap='10px'
        mt='5px'
        minW='500px'
        minColumnWidth='280px'>

        {/* videos to be repeated count */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.videosToBeRepeatedCount.title}
            value={homePageStats?.videosToBeRepeatedCount}
            suffix={translatableTexts.homePage.statsSummary.videosToBeRepeatedCount.suffix}
            iconPath={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
            isOpenByDefault={false} />

        {/* completed videos last month */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.completedVideosLastMonth.title}
            value={homePageStats?.completedVideosLastMonth}
            suffix={translatableTexts.homePage.statsSummary.completedVideosLastMonth.suffix}
            iconPath={Environment.getAssetUrl('images/watch3D.png')}
            isOpenByDefault={false} />

        {/* progress  */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.lagBehindPercentage.title}
            value={getProgressFromLagBehind(homePageStats?.lagBehindPercentage)}
            suffix={translatableTexts.homePage.statsSummary.lagBehindPercentage.suffix}
            iconPath={Environment.getAssetUrl('images/answeredquestions3D.png')}
            isOpenByDefault={false} />

        {/* performance last month  */}
        <StatisticsCard
            title={translatableTexts.homePage.statsSummary.performanceLastMonth.title}
            value={homePageStats?.performanceLastMonth}
            suffix={translatableTexts.homePage.statsSummary.performanceLastMonth.suffix}
            iconPath={Environment.getAssetUrl('images/rightanswer3D.png')}
            isOpenByDefault={false} />

    </EpistoGrid>;
};
