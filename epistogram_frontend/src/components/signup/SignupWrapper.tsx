import { Box, Flex, Image } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { ReactNode } from 'react';
import { hasValue, isString, useIsDesktopView } from "../../frontendHelpers";
import { EpistoHeader } from "../administration/universal/EpistoHeader";
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

    return <Flex id="signupWrapperRoot" p="20px" direction="column" width="100%" height="100%">

        {/* header */}
        <Flex id="header" direction="column">

            {/* header top */}
            <Flex
                id="titleAligner"
                className="dividerBorderBottom"
                height="40px"
                justify="space-between">

                <Box>
                    {hasUpperTitle &&
                        <Typography
                            variant={"overline"}>{upperTitle}
                        </Typography>}
                </Box>

                {props.upperComponent}
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
                maxWidth="850px">

                {/* image */}
                {hasImage && <Flex
                    flex="4"
                    minWidth="300px"
                    justify={isDesktop ? "flex-end" : "center"}>
                    <Image
                        height="20vh"
                        src={currentImage!}
                        mr="20px"></Image>
                </Flex>}

                {/* question content */}
                <Flex
                    id="content"
                    flex="5"
                    minWidth="300px"
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
        <Box id="footerBox" >
            {props.bottomComponent}
        </Box>
    </Flex>
};
