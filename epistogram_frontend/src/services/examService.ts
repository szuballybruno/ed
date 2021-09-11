import { useReactQuery } from "../frontendHelpers";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { ExamResultsDTO } from "../models/shared_models/ExamResultsDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { httpGetAsync, usePostData } from "./httpClient";

export const useSaveExamAnswer = () => {

    const qr = usePostData<QuestionAnswerDTO, AnswerDTO>("questions/answer-exam-question");

    return {
        saveExamAnswer: qr.postDataAsync,
        saveExamAnswerError: qr.error,
        saveExamAnswerState: qr.state,
        correctExamAnswerId: qr.result?.answerId ?? null,
        clearExamAnswerCache: qr.clearCache
    }
}

export const useExamResults = () => {

    const qr = useReactQuery<ExamResultsDTO>(
        ["getExamResults"],
        () => httpGetAsync("/exam/get-exam-results"),
        false);

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.status,
        refetchExamResults: qr.refetch
    }
}