import { useReactQuery2 } from "../../static/frontendHelpers";
import { AnswerDTO } from "../../shared/dtos/AnswerDTO";
import { AnswerSignupQuestionDTO } from "../../shared/dtos/AnswerSignupQuestionDTO";
import { PersonalityAssessmentDTO } from "../../shared/dtos/PersonalityAssessmentDTO";
import { SignupDataDTO } from "../../shared/dtos/SignupDataDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
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