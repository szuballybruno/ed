import { FlexProps, Flex } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";

export const ContentPane = (props: {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean
} & FlexProps) => {

    const { noPadding, showLogo, noMaxWidth, navbarBg, hideNavbar, ...css } = props;

    return (
        <Flex
            id="contentPane"
            p={props.noPadding ? undefined : "0 30px 40px 30px"}
            flex="1"
            maxWidth={noMaxWidth ? undefined : "1400px"}
            direction="column"
            margin="auto"
            overflowY="scroll"
            className="whall"
            {...css}>

            {!hideNavbar && <Navbar
                showLogo={showLogo}
                backgroundContent={navbarBg} />}

            {props.children}
        </Flex>
    );
};