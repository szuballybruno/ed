import { useReactQuery } from "../frontendHelpers";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpPostAsync, usePostData } from "./httpClient";

export const useAnswerSignupQuestion = () => {

    const qr = usePostData<SaveQuestionAnswerDTO, AnswerDTO>(`questions/answer-signup-question`);

    return {
        saveAnswersStatus: qr.state,
        saveAnswersError: qr.error,
        saveAnswersAsync: qr.postDataAsync,
        correctAnswerId: qr.result?.answerId ?? null
    };
}