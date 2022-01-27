import { PrequizQuestionDTO } from "../../models/shared_models/PrequizQuestionDTO";
import { PrequizUserAnswerDTO } from "../../models/shared_models/PrequizUserAnswerDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const usePrequizQuestions = () => {

    const qr = useReactQuery2<PrequizQuestionDTO[]>(apiRoutes.prequiz.getQuestions);

    return {
        questions: qr.data ?? [],
        questionsState: qr.state,
        questionsError: qr.error
    }
}

export const usePrequizUserAnswer = (questionId: number | null) => {

    const qr = useReactQuery2<PrequizUserAnswerDTO>(apiRoutes.prequiz.getUserAnswer, { questionId }, !!questionId);

    return {
        userAnswer: qr.data,
        userAnswerState: qr.state,
        userAnswerError: qr.error
    }
}

export const useAnswerPrequizQuestion = () => {

    const qr = usePostDataUnsafe<{
        questionId: number,
        answerId: number | null,
        value: number | null
    }, void>(apiRoutes.prequiz.answerPrequizQuestion);

    return {
        answerPrequizQuestionAsync: qr.postDataAsync,
        answerPrequizQuestionState: qr.state
    }
}