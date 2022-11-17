import { Responsivity } from '../../helpers/responsivity';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import Navbar from '../navbar/Navbar';
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
        isHeaderFixed: rawIsHeaderFixed
    } = contextValue.contentPaneProps;

    const { isMobile } = Responsivity
        .useIsMobileView();

    const isHeaderFixed = isMobile || rawIsHeaderFixed;

    return (
        <EpistoFlex2
            id={ContentPaneRoot.name}
            direction="column"
            flex="1"
            overflowY={noOverflow
                ? 'hidden'
                : isHeaderFixed
                    ? undefined
                    : 'scroll'}
            overflowX="hidden" >

            {(!hideNavbar && !isMobile) && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}

            <EpistoFlex2
                id={`${ContentPaneRoot.name}-ContentContainer`}
                maxWidth={useMaxWidth ? '1400px' : undefined}
                padding={noPadding
                    ? undefined
                    : padding
                        ? padding
                        : '0 30px 0px 30px'}
                overflowY={noOverflow
                    ? 'hidden'
                    : isHeaderFixed
                        ? 'scroll'
                        : undefined}
                flex="1"
                direction='column'>

                {children}
            </EpistoFlex2>

            {
                (!hideNavbar && isMobile) && <Navbar
                    isLowHeight={isNavbarLowHeight}
                    showLogo={showLogo}
                    isMinimalMode={isMinimalMode}
                    backgroundContent={navbarBg} />
            }
        </EpistoFlex2 >
    );
};