import { applicationRoutes } from '../../configuration/applicationRoutes';
import browser from '../../services/core/browserSniffingService';
import { useIsMobileView, useScreenOrientation } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { PageRootContainer } from '../PageRootContainer';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CourseOverviewSubpage } from './courseOverview/CourseOverviewSubpage';
import { CourseRatingSubpage } from './courseRating/CourseRatingSubpage';
import { PrequizGreetingSubpage } from './prequiz/PrequizGreetingSubpage';
import { PrequizSubpage } from './prequiz/PrequizSubpage';
import { PretestGreetingSubpage } from './pretest/PretestGreetingSubpage';
import { PretestResultsSubpage } from './pretest/PretestResultsSubpage';
import { PretestSubpage } from './pretest/PretestSubpage';
import { ShouldRotatePhoneOverlay } from './watch/ShouldRotatePhoneOverlay';
import { useVideoPlayerFullscreenContext } from './watch/videoPlayer/VideoPlayerFullscreenFrame';
import { WatchSubpage } from './watch/WatchSubpage';
export const PlayerPage = () => {

    const isMobile = useIsMobileView();
    const isIPhone = browser.isIPhone;
    const [isFullscreen, setIsFullscreen] = useVideoPlayerFullscreenContext();
    const isIphoneFullscreenMode = (isFullscreen && isIPhone);
    const screenOrientation = useScreenOrientation();
    const isLandscape = screenOrientation === 90;
    const showShouldRotatePhoneOverlay = isMobile && isFullscreen && !isLandscape;

    return (
        <PageRootContainer
            style={{
                '--playerWidth': 'min(min(100vw, 180vh), 1700px)',
                background: 'var(--gradientBlueBackground)'
            } as any}>


            {/* MOBILE ONLY: warning to rotate the mobile, the video
                should only starts in landscape */}
            {showShouldRotatePhoneOverlay && <ShouldRotatePhoneOverlay
                onExitFullScreen={() => {
                    setIsFullscreen(false);
                }} />}

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
                            element: <CourseRatingSubpage />
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
