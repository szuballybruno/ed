import { ChangeHistory, CheckBoxOutlineBlank, RadioButtonUnchecked } from "@mui/icons-material";
import { useState } from "react";
import { hasValue } from "../../frontendHelpers";
import { QuestionnaierAnswer } from "../universal/QuestionnaireAnswer";
import { QuestionnaireLayout } from "../universal/QuestionnaireLayout";

export const StillWatching = (props: { onClose: () => void, optionIndex: number }) => {

    const options = [
        {
            displayName: "zöld háromszöget",
            "component": <ChangeHistory style={{ color: "var(--intenseGreen)" }} />
        },
        {
            displayName: "piros négyzetet",
            component: <CheckBoxOutlineBlank style={{ color: "var(--intenseRed)" }} />
        },
        {
            displayName: "sárga kört",
            component: <RadioButtonUnchecked style={{ color: "var(--intenseYellow)" }} />
        }
    ]

    const correctOptionIndex = props.optionIndex;
    const correctOption = options[correctOptionIndex];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return <QuestionnaireLayout loadingProps={{ loadingState: "success" }}
        title={`Kérlek válaszd ki a ${correctOption.displayName}!`} buttonsEnabled={true}>
        {options
            .map((option, index) => <QuestionnaierAnswer
                key={index}
                isCorrect={hasValue(selectedIndex) && index === correctOptionIndex}
                isIncorrect={selectedIndex === index && index !== correctOptionIndex}
                onClick={() => {

                    setSelectedIndex(index);
                    setTimeout(() => props.onClose(), 500);
                }}>
                {option.component}
            </QuestionnaierAnswer>)}
    </QuestionnaireLayout>
}