import { useState } from "react";
import { useReactQuery } from "../frontendHelpers";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SaveQuestionnaireAnswersDTO } from "../models/shared_models/SaveQuestionnaireAnswersDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { httpPostAsync } from "./httpClient";

export const useSignupData = (invitationToken: string) => {

    const url = `get-signup-data`;
    const qr = useReactQuery<SignupDataDTO>(
        ['getSignupData'],
        () => httpPostAsync(url, { token: invitationToken }));

    return {
        signupData: qr.data,
        signupDataStatus: qr.status,
        signupDataError: qr.error
    };
}

export const useSaveSignupQuestionnaireAnswers = () => {

    const url = `save-signup-questionnaire-answers`;

    const [state, setState] = useState<LoadingStateType>("success");
    const [error, setError] = useState<any>(null);

    const postData = async (questionAnswers: QuestionAnswerDTO[], invitationToken: string) => {

        const dto = {
            invitationToken: invitationToken,
            answers: questionAnswers
        } as SaveQuestionnaireAnswersDTO;

        try {

            setState("loading");

            const postResult = await httpPostAsync(url, dto);

            setState("success");
        }
        catch (e) {

            setState("error");
        }
    }

    return {
        saveAnswersStatus: state,
        saveAnswersError: error,
        saveAnswers: postData
    };
}