import React from 'react';
import classes from "./startRegistration.module.scss";
import {Title} from "../../fragments/Title";
import {Description} from "../../fragments/Description";
import {NextButton} from "../../fragments/NextButton";
import {SignupWrapper} from "../../HOC/signupWrapper/SignupWrapper";

export const StartRegistration = (
    props: {
        title: string,
        description: string,
        onClick: (e: React.MouseEvent<any>) => void
        backHandler: (e: React.MouseEvent<any>) => any
        currentImage: string
        showUpperTitle: boolean
        upperTitle: string
        nextButtonTitle: string
    }) => <SignupWrapper {...props}>
        <div className={classes.questionAndAnswersWrapper}>
            <Title text={props.title} />
            <Description text={props.description} />
            <div >
                <NextButton buttonTitle={props.nextButtonTitle}
                            onClick={props.onClick}
                            type={"button"}/>
            </div>
        </div>
    </SignupWrapper>

export default StartRegistration;