import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { usePostData } from "./httpClient";

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