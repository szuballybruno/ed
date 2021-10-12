import { Typography } from "@mui/material";
import { usePaging } from "../../frontendHelpers";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { useShowErrorDialog } from "../../services/notifications";
import { LinearProgressWithLabel } from "../signup/ProgressIndicator";
import { SignupRadioGroup } from "../signup/SignupRadioGroup";
import { SignupWrapper } from "../signup/SignupWrapper";

export const useQuestionSlidesState = (
    questions: QuestionDTO[],
    answerQuestionAsync: (answerId: number, questionId: number) => Promise<void>,
    getSelectedAnswerId: (questionId: number) => number | null,
    correctAnswerId: number | null,
    upperTitle?: string,
    onPrevoiusOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    clearAnswerCache?: () => void,) => {

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
        correctAnswerId
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
        correctAnswerId
    } = state;

    const handleAnswerSelectedAsync = async (answerId: number) => {

        try {

            await answerQuestionAsync(answerId, currentQuestion!.questionId);
            handleNext();
        } catch (e) {

            showError(e);
        }
    }

    return <>
        {currentQuestion && <SignupWrapper
            title={currentQuestion!.questionText}
            upperTitle={upperTitle}
            nextButtonTitle="Kovetkezo"
            onNext={selectedAnswerId ? handleNext : undefined}
            currentImage={currentQuestion!.imageUrl!}
            onNavPrevious={questionnaireState.previous}
            bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
            upperComponent={<Typography>{questionnaireProgressLabel}</Typography>}>

            <SignupRadioGroup
                answers={currentQuestion!.answers}
                onAnswerSelected={handleAnswerSelectedAsync}
                selectedAnswerId={selectedAnswerId}
                correctAnswerId={correctAnswerId} />
        </SignupWrapper>}
    </>
}