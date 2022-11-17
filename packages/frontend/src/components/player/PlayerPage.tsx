import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { CoinRewardDialog } from '../CoinRewardDialog';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CourseOverviewSubpage } from './courseOverview/CourseOverviewSubpage';
import { CourseRatingSubpage } from './courseRating/CourseRatingSubpage';
import { GreetingSubpage } from './greeting/GreetingSubpage';
import { PrequizSubpage } from './prequiz/PrequizSubpage';
import { PretestGreetingSubpage } from './pretest/PretestGreetingSubpage';
import { PretestResultsSubpage } from './pretest/PretestResultsSubpage';
import { PretestSubpage } from './pretest/PretestSubpage';
import { useVideoPlayerFullscreenContext } from './watch/videoPlayer/VideoPlayerFullscreenFrame';
import { WatchSubpage } from './watch/WatchSubpage';

export const PlayerPage = () => {

    const { isMobile } = Responsivity
        .useIsMobileView();
    const { isIPhone } = Responsivity
        .useIsIPhone();
    const { isLandscape } = Responsivity
        .useIsLandscape();

    const [isFullscreen] = useVideoPlayerFullscreenContext();
    const isIphoneFullscreenMode = (isFullscreen && isIPhone && isLandscape);

    const coinAcquiredDialogLogic = useEpistoDialogLogic('courseRatingCoinAcquired');

    return (
        <>

            <CoinRewardDialog
                lottiePath={'lottie_json/session_streak_3.json'}
                coinRewardAmount={300}
                text='Köszönjük, hogy megosztottad velünk a véleményed. A jutalmad:'
                dialogLogic={coinAcquiredDialogLogic} />

            <ContentPane
                noPadding={isMobile}
                margin="auto"
                maxHeight='100vh'
                minHeight='100vh'
                position={isIphoneFullscreenMode ? 'fixed' : undefined}
                top={isIphoneFullscreenMode ? '0' : undefined}
                minWidth='100%'
                height={isIphoneFullscreenMode ? '100vh' : undefined}
                width={isIphoneFullscreenMode ? '100vw' : 'min(min(100vw, 180vh), 1700px)'}
                hideNavbar={isIphoneFullscreenMode}
                isMinimalMode
                noOverflow
                showLogo>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: applicationRoutes.playerRoute.greetingRoute,
                            element: <GreetingSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.prequizRoute,
                            element: <PrequizSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.pretestGreetingRoute,
                            element: <PretestGreetingSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.pretestRoute,
                            element: <PretestSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.pretestResultsRoute,
                            element: <PretestResultsSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.watchRoute,
                            element: <WatchSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.courseRatingRoute,
                            element: <CourseRatingSubpage coinAcquiredDialogLogic={coinAcquiredDialogLogic} />
                        },
                        {
                            route: applicationRoutes.playerRoute.courseOverviewRoute,
                            element: <CourseOverviewSubpage />
                        }
                    ]} />
            </ContentPane>
        </ >
    );
};
