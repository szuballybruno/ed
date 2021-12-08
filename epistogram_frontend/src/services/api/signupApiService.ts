import { useReactQuery2 } from "../../static/frontendHelpers";
import { AnswerDTO } from "../../models/shared_models/AnswerDTO";
import { AnswerSignupQuestionDTO } from "../../models/shared_models/AnswerSignupQuestionDTO";
import { PersonalityAssessmentDTO } from "../../models/shared_models/PersonalityAssessmentDTO";
import { SignupDataDTO } from "../../models/shared_models/SignupDataDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostDataUnsafe } from "../core/httpClient";

export const usePersonalityData = () => {

    const qr = useReactQuery2<PersonalityAssessmentDTO>(apiRoutes.signup.getUserPersonalityData);

    return {
        personalityData: qr.data,
        personalityDataState: qr.state,
        personalityDataError: qr.error
    };
}

export const useSignupData = () => {

    const qr = useReactQuery2<SignupDataDTO>(apiRoutes.signup.getSignupData);

    return {
        signupData: qr.data,
        signupDataStatus: qr.state,
        signupDataError: qr.error,
        refetchSignupData: qr.refetch
    };
}

export const useAnswerSignupQuestion = () => {

    const qr = usePostDataUnsafe<AnswerSignupQuestionDTO, AnswerDTO>(apiRoutes.signup.answerSignupQuestion);

    return {
        saveAnswersStatus: qr.state,
        saveAnswersAsync: qr.postDataAsync,
        correctAnswerId: qr.result?.answerId ?? null
    };
}