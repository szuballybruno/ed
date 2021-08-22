import { SignupWrapper } from "../../HOC/signupWrapper/SignupWrapper";
import { SignupForm } from "../../fragments/SignupForm";
import { Title } from "../../fragments/Title";
import React from "react";
import classes from './registrationForm.module.scss'
import { RegFormStateType as RegFormStateType } from "../../Signup";

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
    regFormState: RegFormStateType
    onSubmit: (e: any) => any
    errorText?: string
}) => {



    return <SignupWrapper {...props}>
        <div className={classes.questionAndAnswersWrapper}>
            <Title text={props.title} />
            <div className={classes.answersWrapper}>
                <SignupForm {...props} />
            </div>
        </div>
    </SignupWrapper>
}