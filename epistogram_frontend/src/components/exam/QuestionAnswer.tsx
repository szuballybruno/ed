import { FlexProps } from "@chakra-ui/layout";
import { Checkbox, Typography } from "@mui/material";
import { FlexFloat } from "../universal/FlexFloat";

export const QuestionAnswer = (props: {
    onClick?: () => void,
    isSelected: boolean,
    answerText: string,
    isCorrect?: boolean
} & FlexProps) => {

    const { onClick, isSelected, isCorrect, answerText, ...css } = props;

    const getBgColor = () => {

        if (isCorrect)
            return "var(--mildGreen)";

        if (isSelected && isCorrect === undefined)
            return "rgba(124,192,194,0.34)";

        if (isSelected)
            return "var(--mildRed)"

        return undefined;
    }

    return <FlexFloat
        alignItems={"center"}
        borderRadius={7}
        minW={150}
        cursor={onClick ? "pointer" : undefined}
        onClick={onClick}
        style={{
            backgroundColor: getBgColor(),
            padding: "10px",
            border: "1px solid var(--mildGrey)"
        }}
        {...css}>

        <Checkbox
            checked={isSelected}
            size="small"
            value="advanced" />

        <Typography style={{ fontSize: "14px" }}>
            {answerText}
        </Typography>
    </FlexFloat>
}