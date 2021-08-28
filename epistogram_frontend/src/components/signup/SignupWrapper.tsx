import { Flex } from "@chakra-ui/react";
import { Button, Divider, Typography } from "@material-ui/core";
import React, { ReactNode } from 'react';
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

    return <div className={classes.signupWrapper} style={{ flex: 1 }}>

        {/* header */}
        <div className={classes.contentWrapper}>

            {/* upper title */}
            <Flex height="40px" width="100%" align="left" justify="center">
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
        </div>

        {/* content */}
        <div className={classes.questionAndAnswersOuterWrapper}>
            <img className={classes.questionImage} src={currentImage} alt={""} />
            <div className={classes.questionAndAnswersWrapper}>

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
        </div>

        {/* progress bar */}
        {props.bottomComponent}
    </div>
};
