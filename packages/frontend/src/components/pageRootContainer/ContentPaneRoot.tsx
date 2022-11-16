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
        padding
    } = contextValue.contentPaneProps;

    const { isMobile } = Responsivity
        .useIsMobileView();

    return (
        <EpistoFlex2
            id={ContentPaneRoot.name}
            direction="column"
            flex="1"
            overflowY={isMobile
                ? undefined
                : noOverflow
                    ? 'hidden'
                    : 'scroll'}
            overflowX="hidden">

            {(!hideNavbar && !isMobile) && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}

            <EpistoFlex2
                maxWidth={useMaxWidth ? '1400px' : undefined}
                padding={noPadding
                    ? undefined
                    : padding
                        ? padding
                        : '0 30px 0px 30px'}
                overflowY={isMobile
                    ? noOverflow
                        ? 'hidden'
                        : 'scroll'
                    : undefined}
                flex="1"
                direction='column'>

                {children}
            </EpistoFlex2>

            {(!hideNavbar && isMobile) && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}
        </EpistoFlex2>
    );
};