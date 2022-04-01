import { useEffect } from "react";
import { AnswerSignupQuestionDTO } from "../shared/dtos/AnswerSignupQuestionDTO";
import { useSignupData, useAnswerSignupQuestion } from "../services/api/signupApiService";
import { SingupQuestionSlides, useSignupQuestionsState } from "./exam/SingupQuestionSlides";
import { LoadingFrame } from "./system/LoadingFrame";

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

    const handleSaveSelectedAnswerAsync = async (answerId: number, questionId: number) => {

        const dto = {
            answerId,
            questionId
        } as AnswerSignupQuestionDTO;

        await saveAnswersAsync(dto);
        await refetchSignupData();
    };

    const state = useSignupQuestionsState({
        questions: questions,
        answerQuestionAsync: handleSaveSelectedAnswerAsync,
        upperTitle: "Személyes tanulási stílus felmérése",
        onPrevoiusOverNavigation: onPrevoiusOverNavigation,
        onNextOverNavigation: onNextOverNavigation,
        allowQuickNext: true
    });

    // navigate to next page if signup is completed
    useEffect(() => {

        if (signupData?.isCompleted)
            onJumpToResults();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signupData?.isCompleted]);

    return <LoadingFrame
        className="whall"
        error={signupDataError} >

        <SingupQuestionSlides state={state} />
    </LoadingFrame>;
};
