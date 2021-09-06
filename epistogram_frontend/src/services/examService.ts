import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { usePostData } from "./httpClient";

export const useSaveExamAnswer = () => {

    const qr = usePostData<QuestionAnswerDTO, void>("exam/answer");

    return {
        saveExamAnswer: qr.postDataAsync,
        saveExamAnswerError: qr.error,
        saveExamAnswerState: qr.state
    }
}