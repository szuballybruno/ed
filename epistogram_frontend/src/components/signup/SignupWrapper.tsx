import { Box, Flex, Image } from "@chakra-ui/react";
import { Button, Divider, Typography } from "@mui/material";
import React, { ReactNode } from 'react';
import { hasValue, isString } from "../../frontendHelpers";
import { EpistoHeader } from "../administration/universal/EpistoHeader";
import { EpistoButton } from "../universal/EpistoButton";
import classes from "./signupWrapper.module.scss";

export const SignupWrapper = (props: {
    children: ReactNode,
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

    return <Flex id="signupWrapperRoot" p="20px" direction="column" width="100%" height="100%">

        {/* header */}
        <Flex id="header" direction="column">

            {/* upper title */}
            <Flex id="titleAligner" className="dividerBorderBottom" height="40px" justify="start">
                {hasUpperTitle &&
                    <Typography
                        variant={"overline"}>{upperTitle}
                    </Typography>}
            </Flex>

            {/* back button */}
            {canNavPrevious && <div className={classes.backAndProgress}>
                <Button onClick={() => onNavPrevious!()}>
                    Vissza
                </Button>
                {props.upperComponent}
            </div>}
        </Flex>

        {/* content */}
        <Flex
            id="contentAligner"
            align="center"
            justify="center"
            flex="1">

            {/* image */}
            {hasImage && <Image width="250px" height="250px" src={currentImage!} mr="20px"></Image>}

            {/* question content */}
            <Flex
                id="content"
                direction="column"
                minWidth="300px">

                {/* title */}
                {hasTitle && <EpistoHeader
                    variant="strongSub"
                    m="10px"
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
                {children}

                {/* next button */}
                {onNext && <EpistoButton
                    variant={"outlined"}
                    onClick={() => onNext!()}
                    style={{
                        marginTop: "20px",
                        alignSelf: hasImage ? "flex-start" : "center"
                    }}>
                    {nextButtonTitle}
                </EpistoButton>}
            </Flex>
        </Flex>

        {/* progress bar */}
        <Box id="footerBox" >
            {props.bottomComponent}
        </Box>
    </Flex>
};
