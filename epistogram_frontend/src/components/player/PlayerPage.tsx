import { applicationRoutes } from '../../configuration/applicationRoutes';
import browser from '../../services/core/browserSniffingService';
import { useIsMobileView } from '../../static/frontendHelpers';
import { CoinRewardDialog } from '../CoinRewardDialog';
import { ContentPane } from '../ContentPane';
import { PageRootContainer } from '../PageRootContainer';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CourseOverviewSubpage } from './courseOverview/CourseOverviewSubpage';
import { CourseRatingSubpage } from './courseRating/CourseRatingSubpage';
import { PrequizGreetingSubpage } from './prequiz/PrequizGreetingSubpage';
import { PrequizSubpage } from './prequiz/PrequizSubpage';
import { PretestGreetingSubpage } from './pretest/PretestGreetingSubpage';
import { PretestResultsSubpage } from './pretest/PretestResultsSubpage';
import { PretestSubpage } from './pretest/PretestSubpage';
import { useVideoPlayerFullscreenContext } from './watch/videoPlayer/VideoPlayerFullscreenFrame';
import { WatchSubpage } from './watch/WatchSubpage';
export const PlayerPage = () => {

    const isMobile = useIsMobileView();
    const isIPhone = browser.isIPhone;
    const [isFullscreen] = useVideoPlayerFullscreenContext();
    const isLandscape = window.orientation === 90;
    const isIphoneFullscreenMode = (isFullscreen && isIPhone && isLandscape);

    const coinAcquiredDialogLogic = useEpistoDialogLogic('courseRatingCoinAcquired');

    return (
        <PageRootContainer
            style={{
                '--playerWidth': 'min(min(100vw, 180vh), 1700px)',
                background: 'var(--gradientBlueBackground)'
            } as any}>

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
                width={isIphoneFullscreenMode ? '100vw' : 'var(--playerWidth)'}
                noOverflow
                hideNavbar={isIphoneFullscreenMode}
                isMinimalMode
                showLogo>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: applicationRoutes.playerRoute.prequizGreetingRoute,
                            element: <PrequizGreetingSubpage />
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
        </PageRootContainer >
    );
};
