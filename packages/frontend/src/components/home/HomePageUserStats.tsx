import { ReactNode, useContext } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { useHomePageStats } from '../../services/api/userStatsApiService';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import { CurrentUserContext } from '../system/AuthenticationFrame';

const HomePageUserStatsWrapper = (props: {
    isSmallDesktop: boolean,
    isMobile: boolean,
    children: ReactNode
}) => {

    const { isMobile, isSmallDesktop, children } = props;

    return isMobile
        ? <EpistoGrid
            width='100%'
            auto='fill'
            gap='10px'
            mt='5px'
            minColumnWidth='150px'>

            {children}
        </EpistoGrid>
        : <EpistoGrid
            className='whall'
            auto='fill'
            gap='10px'
            minWidth='450px'
            autoRows={isSmallDesktop ? '120px' : '150px'}
            gridTemplateColumns={isSmallDesktop ? 'auto auto auto auto' : 'auto auto'}
            minColumnWidth={isSmallDesktop ? '140px' : '225px'}>

            {children}
        </EpistoGrid>;
};

export const HomePageUserStats = (props: {
    isSmallDesktop: boolean
}) => {

    const { isSmallDesktop } = props;
    const { id } = useContext(CurrentUserContext);
    const { homePageStats } = useHomePageStats();
    const { isMobile } = Responsivity
        .useIsMobileView();

    return <HomePageUserStatsWrapper
        isSmallDesktop={isSmallDesktop}
        isMobile={isMobile}>

        {/* videos to be repeated count */}
        <StatisticsCard
            isMobile={isMobile || isSmallDesktop}
            minWidth={isSmallDesktop ? '140px' : '225px'}
            marginTop={isMobile ? '5px' : undefined}
            title={translatableTexts.homePage.statsSummary.videosToBeRepeatedCount.title}
            value={homePageStats?.videosToBeRepeatedCount}
            suffix={translatableTexts.homePage.statsSummary.videosToBeRepeatedCount.suffix}
            iconPath={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
            isOpenByDefault={false} />

        {/* completed videos last month */}
        <StatisticsCard
            isMobile={isMobile || isSmallDesktop}
            minWidth={isSmallDesktop ? '140px' : '225px'}
            marginTop={isMobile ? '5px' : undefined}
            title={translatableTexts.homePage.statsSummary.completedVideosLastMonth.title}
            value={homePageStats?.completedVideosLastMonth}
            suffix={translatableTexts.homePage.statsSummary.completedVideosLastMonth.suffix}
            iconPath={Environment.getAssetUrl('images/watch3D.png')}
            isOpenByDefault={false} />

        {/* progress  */}
        <StatisticsCard
            isMobile={isMobile || isSmallDesktop}
            minWidth={isSmallDesktop ? '140px' : '225px'}
            marginTop={isMobile ? '5px' : undefined}
            title={translatableTexts.homePage.statsSummary.lagBehindPercentage.title}
            value={''}
            suffix={translatableTexts.homePage.statsSummary.lagBehindPercentage.suffix}
            iconPath={Environment.getAssetUrl('images/answeredquestions3D.png')}
            isOpenByDefault={false} />

        {/* performance last month  */}
        <StatisticsCard
            isMobile={isMobile || isSmallDesktop}
            minWidth={isSmallDesktop ? '140px' : '225px'}
            marginTop={isMobile ? '5px' : undefined}
            title={translatableTexts.homePage.statsSummary.performanceLastMonth.title}
            value={homePageStats?.performanceLastMonth}
            suffix={translatableTexts.homePage.statsSummary.performanceLastMonth.suffix}
            iconPath={Environment.getAssetUrl('images/rightanswer3D.png')}
            isOpenByDefault={false} />

    </HomePageUserStatsWrapper >;
};
