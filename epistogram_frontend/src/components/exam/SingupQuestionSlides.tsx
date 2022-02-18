import { Flex } from "@chakra-ui/react";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { usePaging } from "../../static/frontendHelpers";
import { SignupQuestionDTO } from "../../shared/dtos/SignupQuestionDTO";
import { useShowErrorDialog } from "../../services/core/notifications";
import { LinearProgressWithLabel } from "../signup/ProgressIndicator";
import { SignupWrapper } from "../signup/SignupWrapper";
import { borderRadius } from "@mui/system";
import { EpistoFont } from "../controls/EpistoFont";

export const useSignupQuestionsState = (options: {
    questions: SignupQuestionDTO[],
    answerQuestionAsync: (answerId: number, questionId: number) => Promise<void>,
    upperTitle?: string,
    onPrevoiusOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    clearAnswerCache?: () => void,
    allowQuickNext?: boolean
}) => {

    const {
        questions,
        answerQuestionAsync,
        upperTitle,
        onPrevoiusOverNavigation,
        onNextOverNavigation,
        clearAnswerCache,
        allowQuickNext
    } = options;

    // questionnaire
    const questionnaireState = usePaging(questions, onPrevoiusOverNavigation, onNextOverNavigation);
    const currentQuestion = questionnaireState.currentItem;
    const questionnaireProgressbarValue = (questionnaireState.currentIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${questionnaireState.currentIndex + 1}/${questions.length}`;

    const handleNext = () => {

        if (clearAnswerCache)
            clearAnswerCache();

        questionnaireState.next();
    }

    return {
        currentQuestion,
        upperTitle,
        handleNext,
        questionnaireState,
        questionnaireProgressLabel,
        questionnaireProgressbarValue,
        answerQuestionAsync,
        allowQuickNext
    }
}

export type SignupQuestionsStateType = ReturnType<typeof useSignupQuestionsState>;

export const SingupQuestionSlides = (props: { state: SignupQuestionsStateType }) => {

    const state = props.state;
    const showError = useShowErrorDialog();

    const {
        currentQuestion,
        upperTitle,
        handleNext,
        questionnaireState,
        questionnaireProgressLabel,
        questionnaireProgressbarValue,
        answerQuestionAsync,
        allowQuickNext
    } = state;

    const handleAnswerSelectedAsync = async (answerId: number) => {

        try {

            await answerQuestionAsync(answerId, currentQuestion!.questionId);

            if (allowQuickNext)
                handleNext();
        } catch (e) {

            showError(e);
        }
    }

    {/*const Testasd = () => {
        return <FlexFloat
            alignItems={"center"}
            borderRadius={7}
            minWidth={150}
            cursor={onClick ? "pointer" : undefined}
            onClick={onClick ? () => onClick(!isSelected) : undefined}
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

            <EpistoFont fontSize="fontSmallPlus">
                {answerText}
            </EpistoFont>
        </FlexFloat>
    }*/}

    const selectedAnswerId = (currentQuestion?.answers ?? [])
        .filter(x => x.isGiven)[0]?.answerId as null | number;

    return <>
        {currentQuestion && <SignupWrapper
            title={currentQuestion!.questionText}
            upperTitle={upperTitle}
            nextButtonTitle="Következő"
            onNext={selectedAnswerId ? handleNext : undefined}
            currentImage={currentQuestion!.imageUrl!}
            onNavPrevious={questionnaireState.previous}
            bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
            upperComponent={<Flex alignItems={"center"} justifyContent={"flex-end"} width={"30%"}><EpistoFont>{questionnaireProgressLabel}</EpistoFont></Flex>}>

            <RadioGroup
                id="answers"
                style={{ marginBottom: "30px" }}
                name="radioGroup1"
                onChange={(e) => {

                    const selectedAnswerId = parseInt(e.currentTarget.value);
                    handleAnswerSelectedAsync(selectedAnswerId);
                }}>
                {currentQuestion!
                    .answers
                    .map((answer) => <FormControlLabel
                        key={answer.answerId}
                        value={answer.answerId}
                        style={{
                            margin: "5px 0px 0px 0px",
                            backgroundColor: answer.answerId === selectedAnswerId ? "#7CC0C24F" : "white",
                            padding: "5px 10px",
                            border: "1px solid var(--mildGrey)",
                            borderRadius: "6px"
                           
                        }}
                        control={<Radio checked={answer.answerId === selectedAnswerId} />}
                        label={answer.answerText} />)}
            </RadioGroup>
        </SignupWrapper>}
    </>
}
