import { useState } from "react";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { useSaveExamAnswer } from "../services/examService";
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

    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

    // save exam answer
    const {
        saveExamAnswer,
        saveExamAnswerError,
        saveExamAnswerState,
        correctExamAnswerId,
        clearExamAnswerCache
    } = useSaveExamAnswer();

    // handle save selected answer
    const answerQuestionAsync = async (answerId: number, questionId: number) => {

        setSelectedAnswerId(answerId);

        await saveExamAnswer({
            answerSessionId: answerSessionId,
            answerId,
            questionId
        });
    }

    const clearAnswerCache = () => {

        clearExamAnswerCache();
        setSelectedAnswerId(null);
    }

    const state = useQuestionSlidesState(
        questions,
        answerQuestionAsync,
        () => selectedAnswerId,
        correctExamAnswerId,
        undefined,
        undefined,
        onExamFinished,
    );

    return <LoadingFrame
        className="whall"
        loadingState={saveExamAnswerState}
        error={saveExamAnswerError}
        flex="1">

        <QuestionSlides state={state} />
    </LoadingFrame>
}