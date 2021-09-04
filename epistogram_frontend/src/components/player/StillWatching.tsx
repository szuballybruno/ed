import { ChangeHistory, CheckBoxOutlineBlank, RadioButtonUnchecked } from "@material-ui/icons"
import { useState } from "react";
import { hasValue } from "../../frontendHelpers";
import { QuestionnaierAnswer, QuestionnaireLayout } from "../universal/QuestionnaireLayout"

export const StillWatching = (props: { onClose: () => void }) => {

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

    const correctOptionIndex = 0;
    const correctOption = options[correctOptionIndex];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return <QuestionnaireLayout title={`Kérlek válaszd ki a ${correctOption.displayName}!`} buttonsEnabled={true}>
        {options
            .map((option, index) => <QuestionnaierAnswer
                key={index}
                isCorrect={hasValue(selectedIndex) && index === correctOptionIndex}
                isIncorrect={hasValue(selectedIndex) && index !== correctOptionIndex}
                onClick={() => {

                    setSelectedIndex(index);
                    setTimeout(() => props.onClose(), 500);
                }}>
                {option.component}
            </QuestionnaierAnswer>)}
    </QuestionnaireLayout>
}