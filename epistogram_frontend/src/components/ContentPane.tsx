import { FlexProps, Flex } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";

export const ContentPane = (props: {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean
} & FlexProps) => {

    const { noPadding, showLogo, noMaxWidth, isNavbarLowHeight, navbarBg, isMinimalMode, hideNavbar, ...css } = props;

    return (
        <Flex
            id="contentPane"
            p={props.noPadding ? undefined : "0 30px 40px 30px"}
            flex="1"
            maxWidth={noMaxWidth ? undefined : "1400px"}
            direction="column"
            margin="auto"
            overflowY="scroll"
            overflowX="hidden"
            className="whall"
            {...css}>

            {!hideNavbar && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}

            {props.children}
        </Flex>
    );
};