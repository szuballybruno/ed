import { useReactQuery } from "../frontendHelpers";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { ExamResultsDTO } from "../models/shared_models/ExamResultsDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { httpGetAsync, usePostDataUnsafe } from "./httpClient";

export const useSaveExamAnswer = () => {

    const qr = usePostDataUnsafe<QuestionAnswerDTO, AnswerResultDTO>("questions/answer-exam-question");

    return {
        saveExamAnswer: qr.postDataAsync,
        saveExamAnswerState: qr.state,
        answerResult: qr.result ?? null,
        clearExamAnswerCache: qr.clearCache
    }
}

export const useExamResults = (answerSessionId: number) => {

    const qr = useReactQuery<ExamResultsDTO>(
        ["getExamResults"],
        () => httpGetAsync("/exam/get-exam-results?answerSessionId=" + answerSessionId));

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.status
    }
}