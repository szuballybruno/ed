import { FlexProps} from '@chakra-ui/react';
import { EpistoFlex2 } from './controls/EpistoFlex';
import Navbar from './navbar/Navbar';

export const ContentPane = (props: {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean,
    noOverflow?: boolean
} & FlexProps) => {

    const { children, noPadding, showLogo, noMaxWidth, isNavbarLowHeight, navbarBg, isMinimalMode, hideNavbar, noOverflow, ...css } = props;

    return (
        <EpistoFlex2
            id="contentPane"
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
