import { useState } from "react";
import { useReactQuery } from "../frontendHelpers";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { LoadingStateType } from "../models/types";
import { httpPostAsync, usePostData } from "./httpClient";

export const useSignupData = (invitationToken: string) => {

    const url = `get-signup-data`;
    const qr = useReactQuery<SignupDataDTO>(
        ['getSignupData'],
        () => httpPostAsync(url, { token: invitationToken }));

    return {
        signupData: qr.data,
        signupDataStatus: qr.status,
        signupDataError: qr.error,
        refetchSignupData: qr.refetch
    };
}

export const useSaveSignupQuestionnaireAnswers = () => {

    const qr = usePostData<SaveQuestionAnswerDTO, void>(`save-signup-question-answer`);

    return {
        saveAnswersStatus: qr.state,
        saveAnswersError: qr.error,
        saveAnswersAsync: qr.postDataAsync
    };
}