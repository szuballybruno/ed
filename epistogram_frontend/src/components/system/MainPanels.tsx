import { Flex, FlexProps, useMediaQuery } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React, { CSSProperties, ReactNode, useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { currentVersion } from '../../static/Environemnt';
import { getAssetUrl } from '../../static/frontendHelpers';
import Navbar from '../navbar/Navbar';
import { FlexFloat } from '../universal/FlexFloat';
import { CurrentUserContext } from './AuthenticationFrame';

export const MainWrapper = (props: { style?: CSSProperties, children: ReactNode }) => {

    return <Flex
        background="var(--gradientBlueBackground)"
        id="mainWrapper"
        direction="column"
        height="100%"
        width="100%"
        maxW="1920px"
        margin="0 auto"
        position="relative"
        style={props.style}>

        {props.children}

        {/* version */}
        <Typography
            style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                zIndex: 3,
                color: "gray",
                background: "white",
                padding: "5px",
                borderRadius: "5px"
            }}
            className="fontMid mildShadow">
            Verzió: {currentVersion ?? "1999.01.01.01:01"}
        </Typography>
    </Flex>
};

export const ContentWrapper = (props: {
    children: ReactNode
} & FlexProps) => {

    const { children, ...css } = props;

    return <Flex
        id="contentWrapper"
        flex="1"
        overflow="hidden"
        {...css}>
        {children}
    </Flex>
};

export const LeftPanel = (props: FlexProps) => {

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext);
    const { navigate } = useNavigation();

    return (
        <FlexFloat
            borderRadius="none"
            id="leftPanel"
            bg="white"
            zIndex={2}
            flexBasis="320px"
            direction="column"
            align="stretch"
            padding="25px 15px 0 15px"
            className="dividerBorderRight"
            //borderLeft="2px solid #e2e2e2"
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)"
            {...props}>

            {/* logo link */}
            <Flex w="100%" alignItems={"center"} justifyContent="flex-start" mb="20px">
                <img
                    src={getAssetUrl("/images/logo.svg")}
                    style={{
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                        margin: "10px 10px",
                        padding: 0
                    }}
                    alt=""
                    onClick={() => {

                        if (user?.userActivity?.canAccessApplication)
                            navigate(homeUrl);
                    }} />
            </Flex>

            {props.children}
        </FlexFloat>
    );
};

export const RightPanel = (props: FlexProps & { noPadding?: boolean }) => {

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    const { noPadding, ...css } = props;

    return (
        <Flex
            id="rightPanel"
            p={props.noPadding ? undefined : "0 10px 40px 10px"}
            overflowY="scroll"
            flex="1"
            {...css}>

            {/* left side dynamic spacer */}
            {isSmallerThan1400 && <Flex flex="0 1 100px" />}

            {/* center wrapper */}
            <Flex direction="column" align="center" flex="1">

                <Navbar />

                {props.children}
            </Flex>

            {/* right side dynamic spacer */}
            {isSmallerThan1400 && <Flex flex="0 1 100px" />}
        </Flex>
    );
};
