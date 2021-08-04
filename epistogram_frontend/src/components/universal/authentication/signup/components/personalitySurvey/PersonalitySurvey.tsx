import classes from "../../signup.module.scss";
import {Title} from "../../fragments/Title";
import {SignupRadioGroup} from "../../fragments/SignupRadioGroup/SignupRadioGroup";
import React from "react";
import {SignupWrapper} from "../../HOC/signupWrapper/SignupWrapper";

export const PersonalitySurvey = (
    props: {
        title: string,
        currentValue: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
        questionAnswers: {
            answerValue: string
            answerTitle: string
        }[],
        backHandler: (e: React.MouseEvent<any>) => any,
        currentImage: string
        progressCounterValue: string
        progressBarValue: number
    }) => <SignupWrapper {...props}
                         showBackHandler
                         showProgressBar
                         showProgressCounter>
    <div className={classes.questionAndAnswersWrapper}>
        <Title text={props.title} />
        <div className={classes.answersWrapper}>
            <SignupRadioGroup {...props} />
        </div>
    </div>
</SignupWrapper>