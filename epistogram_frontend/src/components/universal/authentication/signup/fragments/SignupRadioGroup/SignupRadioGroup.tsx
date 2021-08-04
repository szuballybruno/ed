import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import React from "react";

export const SignupRadioGroup = (
    props: {
        currentValue: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
        questionAnswers: {
            answerValue: string
            answerTitle: string
        }[]
    }) => <RadioGroup aria-label="gender"
                      name="gender1"
                      value={props.currentValue}
                      onChange={props.onChange}>
    {props.questionAnswers.map((answer) => {
        return <FormControlLabel value={answer.answerValue}
                                 control={<Radio />}
                                 label={answer.answerTitle}/>
    })}
</RadioGroup>