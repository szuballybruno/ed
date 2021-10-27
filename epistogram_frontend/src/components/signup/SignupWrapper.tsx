import { Box, Flex, Image } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { ReactNode } from 'react';
import { getAssetUrl, hasValue, isString, useIsDesktopView } from "../../frontendHelpers";
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
    upperComponent?: ReactNode
}) => {

    const onNavPrevious = props.onNavPrevious;
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

    return <Flex id="signupWrapperRoot" px="20px"
        pb={70} direction="column" width="100%" height="100%"
        overflow={"scroll"} maxH={"100vh"}>

        {/* header */}
        <Flex id="header" direction="column" height={"100%"} maxH={100}>
            <Flex h={60} w={"100%"} hidden={window.innerWidth > 1000} justifyContent={"center"} alignItems={"center"}>
                <Image maxH={80} src={getAssetUrl("/images/logo.svg")} />
            </Flex>
            {/* header top */}
            <Flex
                id="titleAligner"
                className="dividerBorderBottom"
                height="60px"
                justify="space-between">

                <Flex w={window.innerWidth > 400 ? "30%" : "80%"} minW={window.innerWidth > 400 ? 350 : "unset"} h={60} alignItems={"center"} >
                    {hasUpperTitle &&
                        <Typography
                            variant={"overline"}>{upperTitle}
                        </Typography>}
                </Flex>

                <Flex h={60} w={"30%"} hidden={window.innerWidth < 1000} justifyContent={"center"} alignItems={"center"}>
                    <Image maxH={80} src={getAssetUrl("/images/logo.svg")} />
                </Flex>


                {props.upperComponent || <Flex w={"30%"} />}
            </Flex>

            {/* header bottom */}
            {canNavPrevious && <div className={classes.backAndProgress}>
                <EpistoButton onClick={() => onNavPrevious!()} variant="outlined" style={{ marginTop: "10px" }}>
                    Vissza
                </EpistoButton>
            </div>}
        </Flex>

        {/* content aligner */}
        <Flex
            id="contentAligner"
            align="center"
            justify="center"
            flex="1">

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
                    flex="4"
                    minWidth={window.innerWidth > 500 ? 400 : "100%"}
                    minH={400}
                    h="400"
                    justifyContent={isDesktop ? "flex-end" : "center"}>
                    <Image maxW={"100%"} height="100%" src={currentImage!} />
                </Flex>}

                {/* question content */}
                <Flex
                    id="content"
                    flex="5"
                    minWidth={window.innerWidth > 500 ? 300 : "100%"}
                    ml={20}
                    direction="column">

                    {/* title */}
                    {hasTitle && <EpistoHeader
                        variant="strongSub"
                        m="10px 10px 10px 0px"
                        alignSelf={hasImage ? "flex-start" : "center"}
                        text={title!}>
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

                    {/* next button */}
                    {onNext && <EpistoButton
                        variant={"outlined"}
                        onClick={() => onNext!()}
                        style={{
                            marginTop: "20px",
                            alignSelf: isDesktop
                                ? hasImage
                                    ? "flex-start"
                                    : "center"
                                : "flex-end"
                        }}>
                        {nextButtonTitle}
                    </EpistoButton>}
                </Flex>
            </Flex>
        </Flex>

        {/* progress bar */}
        <Box id="footerBox" position={"absolute"} bottom={0} left={5} w={"100%"}>
            {props.bottomComponent}
        </Box>
    </Flex>
};
