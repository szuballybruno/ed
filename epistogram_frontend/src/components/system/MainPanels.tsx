import { Flex, FlexProps, Image, useMediaQuery } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React, { ReactNode, useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuideHelp } from '../../services/core/userGuidingService';
import { currentVersion } from '../../static/Environemnt';
import { getAssetUrl } from '../../static/frontendHelpers';
import Navbar from '../navbar/Navbar';
import { EpistoButton } from '../universal/EpistoButton';
import { FlexFloat } from '../universal/FlexFloat';
import { CurrentUserContext } from './AuthenticationFrame';

export const PageRootContainer = (props: {
    children: ReactNode,
    backgoundImageSrc?: string,
    noBackground?: boolean,
    noMaxWidth?: boolean
} & FlexProps) => {

    const { children, noMaxWidth, noBackground, backgoundImageSrc, ...css } = props;

    return <Flex
        background={backgoundImageSrc || noBackground
            ? undefined
            : "var(--gradientBlueBackground)"}
        id="pageRootContainer"
        maxWidth={noMaxWidth ? undefined : "1920px"}
        margin="0 auto"
        position="relative"
        overflow="hidden"
        className="whall"
        {...css}>

        {(!noBackground && backgoundImageSrc) && <Image
            position="absolute"
            top="0"
            objectFit="cover"
            className="whall"
            src={backgoundImageSrc} />}

        {props.children}

    </Flex>
};

export const LeftPane = (props: FlexProps) => {

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext);
    const { navigate } = useNavigation();

    return (
        <FlexFloat
            borderRadius="none"
            id="leftPane"
            bg="white"
            zIndex={2}
            flexBasis="320px"
            maxW="320px"
            direction="column"
            align="stretch"
            padding="25px 15px 0 15px"
            className="dividerBorderRight"
            position="relative"
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

            {/* magic powder top right */}
            <img
                style={{
                    position: "absolute",
                    right: 23,
                    top: -30,
                    width: 120,
                    transform: "rotate(270deg)",
                    objectFit: "contain",
                    zIndex: -1,
                }}
                src={getAssetUrl("/images/bg-art-6.png")} alt="" />

            {props.children}

            {/* magic powder top right */}
            <img
                style={{
                    position: "absolute",
                    left: -10,
                    bottom: 0,
                    width: 170,
                    transform: "rotate(0deg) scale(-1,1)",
                    objectFit: "contain",
                    zIndex: -1,
                }}
                src={getAssetUrl("/images/bela3D.png")} alt="" />

            {/* tina image */}
            <Flex
                direction="column"
                position="absolute"
                bottom="160"
                right="25"
                w="170px">

                <Typography
                    fontSize="13px"
                    mb="5px">
                    Szia, én Tina vagyok, a te személyes segítőd, ha elakadnál, kérdezz bátran!
                </Typography>
            </Flex>

            {/* tina button */}
            <Flex
                direction="column"
                position="absolute"
                bottom="100"
                right="20"
                w="130px">

                <EpistoButton
                    variant='colored'
                    onClick={() => startUserGuideHelp()}>

                    Segítség
                </EpistoButton>
            </Flex>
        </FlexFloat>
    );
};

export const ContentPane = (props: {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    noMaxWidth?: boolean
} & FlexProps) => {

    const { noPadding, noMaxWidth, navbarBg, hideNavbar, ...css } = props;

    return (
        <Flex
            id="contentPane"
            p={props.noPadding ? undefined : "0 10px 40px 10px"}
            flex="1"
            maxWidth={noMaxWidth ? undefined : "1400px"}
            direction="column"
            margin="auto"
            overflowY="scroll"
            className="whall"
            {...css}>

            {!hideNavbar && <Navbar backgroundContent={navbarBg} />}
            {props.children}
        </Flex>
    );
};
