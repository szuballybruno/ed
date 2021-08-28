import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { AnswerDTO } from "../../models/shared_models/AnswerDTO";

export const SignupRadioGroup = (
    props: {
        selectedAnswerId: number | null,
        onAnswerSelected: (answerId: number) => void,
        answers: AnswerDTO[]
    }) => {

    const { answers, selectedAnswerId, onAnswerSelected } = props;

    return <RadioGroup
        name="radioGroup1"
        onChange={(e) => {

            const selectedAnswerId = parseInt(e.currentTarget.value);
            onAnswerSelected(selectedAnswerId);
        }}>
        {answers
            .map((answer) => {

                return <FormControlLabel
                    key={answer.answerId}
                    value={answer.answerId}
                    control={<Radio checked={answer.answerId == selectedAnswerId} />}
                    label={answer.answerText} />
            })}
    </RadioGroup>
}