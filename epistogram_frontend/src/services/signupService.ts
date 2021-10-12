import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { usePostDataUnsafe } from "./httpClient";

export const useAnswerSignupQuestion = () => {

    const qr = usePostDataUnsafe<SaveQuestionAnswerDTO, AnswerDTO>(`questions/answer-signup-question`);

    return {
        saveAnswersStatus: qr.state,
        saveAnswersAsync: qr.postDataAsync,
        correctAnswerId: qr.result?.answerId ?? null
    };
}