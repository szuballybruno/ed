import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import Navbar from './navbar/Navbar';

export const ContentPane = ({
    children,
    noPadding,
    showLogo,
    noMaxWidth,
    isNavbarLowHeight,
    navbarBg,
    isMinimalMode,
    hideNavbar,
    noOverflow,
    ...css
}: {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean,
    noOverflow?: boolean
} & EpistoFlex2Props) => {

    return (
        <EpistoFlex2
            id={ContentPane.name}
            padding={noPadding ? undefined : '0 30px 0px 30px'}
            flex="1"
            maxWidth={noMaxWidth ? undefined : '1400px'}
            direction="column"
            overflowY={noOverflow ? 'hidden' : 'scroll'}
            overflowX="hidden"
            {...css}>

            {!hideNavbar && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}

            {children}
        </EpistoFlex2>
    );
};
