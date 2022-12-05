import { Responsivity } from '../../helpers/responsivity';
import { PropsWithChildren, useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import Navbar from '../navbar/Navbar';
import { useVideoPlayerFullscreenContext } from '../player/watch/videoPlayer/VideoPlayerFullscreenFrame';
import { PageRootContainerContextType } from './contentPaneRootLogic';

export const ContentPaneRoot = ({
    contextValue,
    children
}: {
    contextValue: PageRootContainerContextType
} & PropsWithChildren) => {

    const {
        noPadding,
        showLogo,
        useMaxWidth,
        isNavbarLowHeight,
        navbarBg,
        isMinimalMode,
        hideNavbar,
        noOverflow,
        padding,
        align,
        justify,
        isHeaderFixed: rawIsHeaderFixed
    } = contextValue.contentPaneProps;

    const { isMobile } = Responsivity
        .useIsMobileView();
    const [isFullscreen] = useVideoPlayerFullscreenContext();

    const currentRoute = useGetCurrentAppRoute();
    const { isUnauthorized } = currentRoute;

    const isHeaderFixed = isMobile || rawIsHeaderFixed;
    const isNavbarShowing = !hideNavbar && !isUnauthorized;

    return (
        <EpistoFlex2
            id={ContentPaneRoot.name}
            direction="column"
            height={(() => {

                if (isMobile && isFullscreen)
                    return '100vh';

                if (isMobile && hideNavbar)
                    return '100vh';

                if (isMobile && !hideNavbar)
                    return 'calc(100vh - 80px)';

                return undefined;
            })()}
            flex="1"

            overflowY={noOverflow
                ? 'hidden'
                : isHeaderFixed
                    ? undefined
                    : 'scroll'}
            overflowX="hidden" >

            {(isNavbarShowing && !isMobile) && (
                <Navbar
                    isLowHeight={isNavbarLowHeight}
                    showLogo={showLogo}
                    isMinimalMode={isMinimalMode}
                    backgroundContent={navbarBg} />
            )}

            <EpistoFlex2
                id={`${ContentPaneRoot.name}-ContentContainer`}
                maxWidth={useMaxWidth ? '1400px' : undefined}
                padding={(() => {

                    if (noPadding)
                        return undefined;

                    if (padding)
                        return padding;

                    if (isMobile)
                        return '0 20px';

                    return '0 30px';
                })()}
                overflowY={noOverflow
                    ? 'hidden'
                    : isHeaderFixed
                        ? 'scroll'
                        : undefined}
                flex="1"
                align={align}
                justify={justify}
                direction='column'>

                {children}
            </EpistoFlex2>

            {(isNavbarShowing && isMobile) && (
                <Navbar
                    isLowHeight={isNavbarLowHeight}
                    showLogo={showLogo}
                    isMinimalMode={isMinimalMode}
                    backgroundContent={navbarBg} />
            )}
        </EpistoFlex2>
    );
};