import {SignupWrapper} from "../../HOC/signupWrapper/SignupWrapper";
import {SignupForm} from "../../fragments/SignupForm";
import {Title} from "../../fragments/Title";
import React from "react";
import classes from './registrationForm.module.scss'
import applicationRunningState from "../../../../../../store/application/applicationRunningState";
import {useState} from "@hookstate/core";

export const RegistrationForm = (props: {
    title: string,
    currentValue: string,
    description: string,
    backHandler: (e: React.MouseEvent<any>) => any,
    onClick: (e: React.MouseEvent<any>) => any,
    currentImage: string
    showBackHandler: boolean
    showUpperTitle: boolean
    upperTitle: string
    to?: string
    nextButtonTitle: string
    onChange: (e: React.FormEvent<{name: string, value: string}>) => any
    onSubmit: (e: any) => any
    errorText?: string
}) => {
    const app = useState(applicationRunningState)
    return <SignupWrapper {...props}>
        <div className={classes.questionAndAnswersWrapper}>
            <Title text={props.title}/>
            <div className={classes.answersWrapper}>
                <SignupForm {...props} />
            </div>
        </div>
    </SignupWrapper>
}