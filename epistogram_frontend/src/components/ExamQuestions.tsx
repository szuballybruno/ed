import { useState } from "react";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { useSaveExamAnswer } from "../services/examService";
import { useShowErrorDialog } from "../services/notifications";
import { QuestionSlides, useQuestionSlidesState } from "./exam/QuestionSlides";
import { LoadingFrame } from "./HOC/LoadingFrame";

export const ExamQuestions = (props: {
    questions: QuestionDTO[],
    answerSessionId: number,
    onExamFinished: () => void
}) => {

    const {
        questions,
        answerSessionId,
        onExamFinished
    } = props;

    const showError = useShowErrorDialog();

    // save exam answer
    const {
        saveExamAnswer,
        saveExamAnswerState,
        answerResult,
        clearExamAnswerCache
    } = useSaveExamAnswer();

    // handle save selected answer
    const answerQuestionAsync = async (answerId: number, questionId: number) => {

        try {

            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerId,
                questionId
            });
        } catch (e) {

            showError(e);
        }
    }

    const state = useQuestionSlidesState({
        questions: questions,
        answerQuestionAsync: answerQuestionAsync,
        getSelectedAnswerId: () => answerResult?.givenAnswerId ?? null,
        correctAnswerId: answerResult?.correctAnswerId ?? null,
        onNextOverNavigation: onExamFinished,
        clearAnswerCache: clearExamAnswerCache
    });

    console.log(answerResult);

    return <LoadingFrame
        className="whall"
        loadingState={saveExamAnswerState}
        flex="1">

        <QuestionSlides state={state} />
    </LoadingFrame>
}