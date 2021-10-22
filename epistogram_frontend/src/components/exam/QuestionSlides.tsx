import { Typography } from "@mui/material";
import { usePaging } from "../../frontendHelpers";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { useShowErrorDialog } from "../../services/notifications";
import { LinearProgressWithLabel } from "../signup/ProgressIndicator";
import { SignupRadioGroup } from "../signup/SignupRadioGroup";
import { SignupWrapper } from "../signup/SignupWrapper";
import {Flex} from "@chakra-ui/react";

export const useQuestionSlidesState = (options: {
    questions: QuestionDTO[],
    answerQuestionAsync: (answerId: number, questionId: number) => Promise<void>,
    getSelectedAnswerId: (questionId: number) => number | null,
    correctAnswerId?: number | null,
    upperTitle?: string,
    onPrevoiusOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    clearAnswerCache?: () => void,
    allowQuickNext?: boolean
}) => {

    const {
        questions,
        answerQuestionAsync,
        getSelectedAnswerId,
        correctAnswerId,
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

    const selectedAnswerId = currentQuestion ? getSelectedAnswerId(currentQuestion.questionId) : null;

    const handleNext = () => {

        if (clearAnswerCache)
            clearAnswerCache();

        questionnaireState.next();
    }

    return {
        currentQuestion,
        upperTitle,
        selectedAnswerId,
        handleNext,
        questionnaireState,
        questionnaireProgressLabel,
        questionnaireProgressbarValue,
        answerQuestionAsync,
        correctAnswerId,
        allowQuickNext
    }
}

export type QuestionSlidesStateType = ReturnType<typeof useQuestionSlidesState>;

export const QuestionSlides = (props: { state: QuestionSlidesStateType }) => {

    const state = props.state;
    const showError = useShowErrorDialog();

    const {
        currentQuestion,
        upperTitle,
        selectedAnswerId,
        handleNext,
        questionnaireState,
        questionnaireProgressLabel,
        questionnaireProgressbarValue,
        answerQuestionAsync,
        correctAnswerId,
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

    return <>
        {currentQuestion && <SignupWrapper
            title={currentQuestion!.questionText} //replaced
            upperTitle={upperTitle}
            nextButtonTitle="Következő" //replaced
            onNext={selectedAnswerId ? handleNext : undefined} //replaced
            currentImage={currentQuestion!.imageUrl!}
            onNavPrevious={questionnaireState.previous}
            bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />} //replaced
            upperComponent={<Flex alignItems={"center"} justifyContent={"flex-end"} w={"30%"}><Typography>{questionnaireProgressLabel}</Typography></Flex>}>

            <SignupRadioGroup
                answers={currentQuestion!.answers}
                onAnswerSelected={handleAnswerSelectedAsync}
                selectedAnswerId={selectedAnswerId}
                correctAnswerId={correctAnswerId ?? null} />
        </SignupWrapper>}
    </>
}
