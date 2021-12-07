import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { getUserPersonalityAssessmentDTOAsync } from "../services/personalityAssessmentService";
import { answerSignupQuestionAsync, getSignupDataAsync } from "../services/SignupService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export const answerSignupQuestionAction = async (params: ActionParams) => {

    const dto = withValueOrBadRequest<AnswerSignupQuestionDTO>(params.req.body);

    await answerSignupQuestionAsync(params.userId, dto);
};

export const getSignupDataAction = (params: ActionParams) => {

    return getSignupDataAsync(params.userId);
};

export const getUserPersonalityDataAction = async (params: ActionParams) => {

    return getUserPersonalityAssessmentDTOAsync(params.userId);
};
