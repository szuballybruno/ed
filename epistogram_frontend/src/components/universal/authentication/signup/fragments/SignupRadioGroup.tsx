import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { AnswerDTO } from "../../../../../models/shared_models/AnswerDTO";

export const SignupRadioGroup = (
    props: {
        selectedAnswerId: number,
        onAnswerSelected: (answerId: number) => void,
        answers: AnswerDTO[]
    }) => {

    const { answers, selectedAnswerId, onAnswerSelected } = props;

    return <RadioGroup
        name="radioGroup1"
        value={selectedAnswerId}
        onChange={(e) => onAnswerSelected(parseInt(e.currentTarget.value))}>
        {answers
            .map((answer) => {

                return <FormControlLabel
                    value={answer.answerId}
                    control={<Radio />}
                    label={answer.answerText} />
            })}
    </RadioGroup>
}