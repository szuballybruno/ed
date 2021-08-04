import {NextButton} from "../../fragments/NextButton";
import {Description} from "../../fragments/Description";
import {Title} from "../../fragments/Title";
import React from "react";
import classes from './summary.module.scss'
import {SignupWrapper} from "../../HOC/signupWrapper/SignupWrapper";

export const Summary = (props: {
    title: string,
    currentValue: string,
    description: string,
    backHandler: (e: React.MouseEvent<any>) => any,
    onClick: (e: React.MouseEvent<any>) => any,
    currentImage: string
    showBackHandler: boolean
    showUpperTitle: boolean
    upperTitle: string
    nextButtonTitle: string
}) => <SignupWrapper {...props}>
    <div className={classes.questionAndAnswersWrapper}>
        <Title text={props.title} />
        <Description text={props.description} />
        <div className={classes.answersWrapper}>
            <NextButton buttonTitle={props.nextButtonTitle} onClick={props.onClick} type={"button"} />
        </div>
    </div>
</SignupWrapper>