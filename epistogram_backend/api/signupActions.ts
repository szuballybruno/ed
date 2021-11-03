import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { getUserPersonalityAssessmentDTOAsync } from "../services/personalityAssessmentService";
import { answerSignupQuestionAsync, getSignupDataAsync } from "../services/signupService";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const answerSignupQuestionAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<AnswerSignupQuestionDTO>(params.req.body);

    await answerSignupQuestionAsync(params.userId, dto);
};

export const getSignupDataAction = (params: ActionParamsType) => {

    return getSignupDataAsync(params.userId);
};

export const getUserPersonalityDataAction = async (params: ActionParamsType) => {

    return getUserPersonalityAssessmentDTOAsync(params.userId);
};
