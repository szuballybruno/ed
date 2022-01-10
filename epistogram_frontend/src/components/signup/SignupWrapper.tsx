import { Box, Flex, Image } from "@chakra-ui/react";
import { ArrowBack } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { ReactNode } from 'react';
import { getAssetUrl, hasValue, isString, useIsDesktopView } from "../../static/frontendHelpers";
import { EpistoHeader } from "../EpistoHeader";
import { EpistoButton } from "../universal/EpistoButton";
import classes from "./signupWrapper.module.scss";

export const SignupWrapper = (props: {
    children?: ReactNode,
    nextButtonTitle?: string
    currentImage?: string,

    onNext?: () => void,
    onNavPrevious?: () => void
    title?: string,
    upperTitle?: string,
    description?: string | ReactNode,
    bottomComponent?: ReactNode,
    upperComponent?: ReactNode,
    headerRightButton?: { name: string, action: () => void }
}) => {

    const { onNavPrevious, headerRightButton } = props;
    const canNavPrevious = !!onNavPrevious;

    const description = props.description;
    const hasDescription = !!description;

    const title = props.title;
    const hasTitle = props.title;

    const upperTitle = props.upperTitle;
    const hasUpperTitle = !!upperTitle;

    const nextButtonTitle = props.nextButtonTitle;
    const currentImage = props.currentImage;
    const hasImage = hasValue(currentImage);
    const children = props.children;
    const onNext = props.onNext;

    const isDesktop = useIsDesktopView();

    return <Flex
        id="signupWrapperRoot"
        direction="column"
        alignItems="center"
        width="100%"
        height="100%"
        px="125px"
        zIndex="3"
        maxH="100vh"
        position="relative"
        overflow="hidden">

        {/* header */}
        <Flex
            id="header"
            direction="column"
            w="100%"
            h="100px"
            py="25px"
            maxH="100px">

            {/* logo */}
            <Flex
                h={50}
                w={"100%"}
                hidden={window.innerWidth > 1000}
                justify={"center"}
                align={"center"}>

                <Image maxH={50} src={getAssetUrl("/images/logo.svg")} />
            </Flex>

            {/* header top */}
            <Flex
                id="titleAligner"
                height="80px"
                justify="space-between">

                <Flex
                    h={80}
                    w={"100%"}
                    hidden={window.innerWidth < 1000}
                    justifyContent={"center"}
                    alignItems={"center"}>

                    <Image maxH={80} src={getAssetUrl("/images/logo.svg")} />
                </Flex>

            </Flex>

        </Flex>

        {/* content aligner */}
        <Flex
            id="contentAligner"
            align="center"
            justify="center"
            maxW="100%"
            flex="1"
            overflowY={"scroll"}>

            {/* content */}
            <Flex
                id="content"
                wrap="wrap"
                justify="center"
                align="center"
                width="90vw"
                height={"90%"}>

                {/* image */}
                {hasImage && <Flex
                    flex="5"
                    minWidth={window.innerWidth > 500 ? 400 : "100%"}
                    minH={400}
                    h="400"
                    justifyContent={isDesktop ? "flex-end" : "center"}>

                    <Image maxW={450} height="100%" src={currentImage!} />
                </Flex>}

                {/* question content */}
                <Flex
                    id="content"
                    flex="5"
                    minWidth={window.innerWidth > 500 ? 300 : "calc(100% - 200px)"}
                    direction="column">

                    {/* title */}
                    {hasTitle && <EpistoHeader
                        variant="strongSub"
                        m="10px 10px 10px 0px"
                        alignSelf={hasImage ? "flex-start" : "center"}
                        text={title!}
                        maxW={400}>
                    </EpistoHeader>}

                    {/* description */}
                    {hasDescription && <Box maxWidth="400px">
                        {
                            isString(description!)
                                ? <Typography>
                                    {description!}
                                </Typography>
                                : description
                        }
                    </Box>}

                    {/* content */}
                    <Flex justify={hasImage ? "flex-start" : "center"}>
                        {children}
                    </Flex>

                </Flex>
            </Flex>
        </Flex>

        {/* progress bar */}
        <Flex
            align="center"
            h="60px"
            w="100%"
            borderRadius="7px"
            bgColor="white"
            justifyContent={"space-between"}
            boxShadow={"5px 5px 15px 3px rgba(0,0,0,0.07)"}
            px="10px"
            my="20"
        >

            {/* back button */}
            {canNavPrevious && <EpistoButton
                onClick={() => onNavPrevious!()}
                variant="outlined"
                style={{
                    marginTop: "0",
                    height: 40,
                    width: 40,
                    color: "#7CC0C2",
                    backgroundColor: "#7CC0C24F",
                    border: "none",
                    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.1)"
                }}>

                <ArrowBack />
            </EpistoButton>}

            <Box id="footerBox" flex="1" mx="20">
                {props.bottomComponent}
            </Box>

            {/* next button */}
            {onNext && <EpistoButton
                variant={"outlined"}
                onClick={() => onNext!()}
                style={{
                    alignSelf: isDesktop
                        ? hasImage
                            ? "center"
                            : "center"
                        : "flex-end",
                    color: "white",
                    backgroundColor: "#97C9CC",
                    border: "none",
                    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)"
                }}>

                {nextButtonTitle}
            </EpistoButton>}

        </Flex>

        {/* magic powder top left */}
        <img
            style={{
                position: "absolute",
                left: 50,
                top: -60,
                width: 300,
                transform: "rotate(270deg)",
                objectFit: "contain",
                zIndex: -1,
            }}
            src={getAssetUrl("/images/bg-art-2.png")} alt="" />

        {/* magic powder top right */}
        <img
            style={{
                position: "absolute",
                right: 50,
                top: -60,
                width: 300,
                transform: "rotate(270deg)",
                objectFit: "contain",
                zIndex: -1,
            }}
            src={getAssetUrl("/images/bg-art-6.png")} alt="" />
    </Flex>
};
