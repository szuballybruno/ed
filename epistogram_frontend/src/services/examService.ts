import { useReactQuery } from "../frontendHelpers";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { ExamEditDataDTO } from "../models/shared_models/ExamEditDataDTO";
import { ExamResultsDTO } from "../models/shared_models/ExamResultsDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync, usePostDataUnsafe } from "./httpClient";

export const useEditExamData = (examId: number) => {

    const qr = useReactQuery<ExamEditDataDTO>(
        ["useEditExamData"],
        () => httpGetAsync(apiRoutes.exam.getExamEditData, { examId }));

    return {
        examEditData: qr.data,
        examEditDataError: qr.error,
        examEditDataState: qr.status
    }
}

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