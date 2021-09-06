import { Box, Flex } from "@chakra-ui/react";
import { Button, Divider, Typography } from "@material-ui/core";
import React, { ReactNode } from 'react';
import { FlexImage } from "../universal/FlexImage";
import classes from "./signupWrapper.module.scss";

export const SignupWrapper = (props: {
    children: ReactNode,
    nextButtonTitle: string
    currentImage: string,

    onNext?: () => void,
    onNavPrevious?: () => void
    title?: string,
    upperTitle?: string,
    description?: string,
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
    const children = props.children;
    const onNext = props.onNext;

    return <Flex id="signupWrapperRoot" p="20px" direction="column" width="100%" height="100%">

        {/* header */}
        <Flex id="header" direction="column">

            {/* upper title */}
            <Flex id="titleAligner" height="40px" justify="start">
                {hasUpperTitle &&
                    <Typography
                        variant={"overline"}>{upperTitle}
                    </Typography>}
            </Flex>

            <Divider className={classes.divider} />

            {/* back button */}
            {canNavPrevious && <div className={classes.backAndProgress}>
                <Button onClick={() => onNavPrevious!()}>
                    Vissza
                </Button>
                {props.upperComponent}
            </div>}
        </Flex>

        {/* content */}
        <Flex id="content" align="center" justify="center" flex="1">

            {/* image */}
            <FlexImage width="250px" height="250px" url={currentImage} mr="20px"></FlexImage>

            {/* question content */}
            <div>

                {/* title */}
                {hasTitle && <div className={classes.questionWrapper}>
                    <Typography variant={"h5"}>
                        {title!}
                    </Typography>
                </div>}

                {/* description */}
                {hasDescription && <div className={classes.descriptionWrapper}>
                    <Typography>
                        {description!}
                    </Typography>
                </div>}

                {/* content */}
                {children}

                {/* next button */}
                {onNext && <div>
                    <Button
                        variant={"outlined"}
                        onClick={() => onNext!()}
                        type="button">
                        {nextButtonTitle}
                    </Button>
                </div>}
            </div>
        </Flex>

        {/* progress bar */}
        <Box id="footerBox" >
            {props.bottomComponent}
        </Box>
    </Flex>
};
