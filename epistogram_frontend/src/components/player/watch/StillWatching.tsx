import { ChangeHistory, CheckBoxOutlineBlank, RadioButtonUnchecked } from "@mui/icons-material";
import { useState } from "react";
import { hasValue } from "../../../static/frontendHelpers";
import { StillWatchingAnswer } from "../../universal/StillWatchingAnswer";
import { QuestionnaireLayout } from "../../universal/QuestionnaireLayout";
import classes from "./stillWatching.module.scss"

export const StillWatching = (props: { onClose: () => void, optionIndex: number }) => {

    const options = [
        {
            displayName: "zöld háromszöget",
            component: <ChangeHistory style={{ color: "var(--intenseGreen)", fontSize: "50px" }} />
        },
        {
            displayName: "piros négyzetet",
            component: <CheckBoxOutlineBlank style={{ color: "var(--intenseRed)", fontSize: "50px" }} />
        },
        {
            displayName: "sárga kört",
            component: <RadioButtonUnchecked style={{ color: "var(--intenseYellow)", fontSize: "50px" }} />
        }
    ]

    const correctOptionIndex = props.optionIndex;
    const correctOption = options[correctOptionIndex];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return <QuestionnaireLayout buttonWrapperStyles={{
        display: "flex",
        flexDirection: "row",
    }} loadingProps={{ loadingState: "success" }}
        title={`Kérlek válaszd ki a ${correctOption.displayName}!`} contentClickable={true}>
        {options
            .map((option, index) => <StillWatchingAnswer
                key={index}
                className={classes.questionnaierAnswerWrapper}
                isCorrect={hasValue(selectedIndex) && index === correctOptionIndex}
                isIncorrect={selectedIndex === index && index !== correctOptionIndex}
                onClick={() => {
                    setSelectedIndex(index);
                    setTimeout(() => props.onClose(), 500);
                }}>
                {option.component}
            </StillWatchingAnswer>)}
    </QuestionnaireLayout>
}
