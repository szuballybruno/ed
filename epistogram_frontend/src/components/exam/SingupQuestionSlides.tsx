import { Flex } from "@chakra-ui/react";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { usePaging } from "../../frontendHelpers";
import { SignupQuestionDTO } from "../../models/shared_models/SignupQuestionDTO";
import { useShowErrorDialog } from "../../services/notifications";
import { LinearProgressWithLabel } from "../signup/ProgressIndicator";
import { SignupWrapper } from "../signup/SignupWrapper";

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
            upperComponent={<Flex alignItems={"center"} justifyContent={"flex-end"} w={"30%"}><Typography>{questionnaireProgressLabel}</Typography></Flex>}>

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
                            margin: "1px 0px 0px 0px",
                        }}
                        control={<Radio checked={answer.answerId === selectedAnswerId} />}
                        label={answer.answerText} />)}
            </RadioGroup>
        </SignupWrapper>}
    </>
}
