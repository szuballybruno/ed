import { useEffect } from "react";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { useAnswerSignupQuestion, useSignupData } from "../services/openEndpointService";
import { QuestionSlides, useQuestionSlidesState } from "./exam/QuestionSlides";
import { LoadingFrame } from "./HOC/LoadingFrame";

export const SignupQuestions = (props: {
    onPrevoiusOverNavigation: () => void,
    onNextOverNavigation: () => void,
    onJumpToResults: () => void
}) => {

    const {
        onNextOverNavigation,
        onPrevoiusOverNavigation,
        onJumpToResults
    } = props;

    const { signupData, signupDataError, signupDataStatus, refetchSignupData } = useSignupData();
    const { saveAnswersAsync, saveAnswersStatus } = useAnswerSignupQuestion();

    const questions = signupData?.questions ?? [];
    const questionAnswers = signupData?.questionAnswers ?? [];

    const getSelectedAnswerId = (questionId: number) => {

        const currentQuestionSelectedAnswer = questionAnswers
            .filter(x => x.questionId === questionId)[0];

        return currentQuestionSelectedAnswer?.answerId as number | null;
    }

    const handleSaveSelectedAnswerAsync = async (answerId: number, questionId: number) => {

        const dto = {
            questionAnswer: {
                answerId,
                questionId
            } as QuestionAnswerDTO
        } as SaveQuestionAnswerDTO;

        await saveAnswersAsync(dto);
        await refetchSignupData();
    }

    const state = useQuestionSlidesState({
        questions: questions,
        answerQuestionAsync: handleSaveSelectedAnswerAsync,
        getSelectedAnswerId: getSelectedAnswerId,
        upperTitle: "Személyes tanulási stílus felmérése",
        onPrevoiusOverNavigation: onPrevoiusOverNavigation,
        onNextOverNavigation: onNextOverNavigation,
        allowQuickNext: true
    });

    // navigate to next page if signup is completed
    useEffect(() => {

        if (signupData?.isCompleted)
            onJumpToResults();
    }, [signupData?.isCompleted]);

    // useEffect(() => {

    //     console.log(window.history);
    // }, [state.questionnaireState.currentIndex]);

    return <LoadingFrame
        className="whall"
        loadingState={[saveAnswersStatus, signupDataStatus]}
        error={signupDataError} >

        <QuestionSlides state={state} />
    </LoadingFrame>
}
