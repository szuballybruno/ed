import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import { AnswerDTO } from "../../models/shared_models/AnswerDTO";

export const SignupRadioGroup = (
    props: {
        selectedAnswerId: number | null,
        correctAnswerId: number | null,
        onAnswerSelected: (answerId: number) => void,
        answers: AnswerDTO[]
    }) => {

    const {
        answers,
        selectedAnswerId,
        onAnswerSelected,
        correctAnswerId
    } = props;

    const hasAnswer = !!correctAnswerId;

    return <RadioGroup
        id="answers"
        style={{ marginBottom: "30px", pointerEvents: correctAnswerId ? "none" : "all" }}
        name="radioGroup1"
        onChange={(e) => {

            const selectedAnswerId = parseInt(e.currentTarget.value);
            onAnswerSelected(selectedAnswerId);
        }}>
        {answers
            .map((answer) => {

                const isIncorrect = correctAnswerId != answer.answerId && selectedAnswerId == answer.answerId;
                const isCorrect = correctAnswerId == answer.answerId && !!selectedAnswerId;

                let borderColor = "black";

                if (isIncorrect)
                    borderColor = "var(--mildRed)";

                if (isCorrect)
                    borderColor = "var(--mildGreen)";

                return <FormControlLabel
                    key={answer.answerId}
                    value={answer.answerId}
                    style={{
                        margin: "1px 0px 0px 0px",
                        color: hasAnswer ? borderColor : undefined,
                        borderBottom: hasAnswer
                            ? (isIncorrect || isCorrect)
                                ? "dotted 4px " + borderColor
                                : "none"
                            : undefined
                    }}
                    control={<Radio checked={answer.answerId == selectedAnswerId} />}
                    label={answer.answerText} />
            })}
    </RadioGroup>
}