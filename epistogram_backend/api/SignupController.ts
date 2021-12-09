import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { getUserPersonalityAssessmentDTOAsync } from "../services/personalityAssessmentService";
import { SignupService } from "../services/SignupService2";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class SignupController {

    private _signupService: SignupService;

    constructor(signupService: SignupService) {

        this._signupService = signupService;
    }

    answerSignupQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<AnswerSignupQuestionDTO>(params.req.body);

        await this._signupService
            .answerSignupQuestionAsync(params.userId, dto);
    };

    getSignupDataAction = (params: ActionParams) => {

        return this._signupService
            .getSignupDataAsync(params.userId);
    };

    getUserPersonalityDataAction = async (params: ActionParams) => {

        return getUserPersonalityAssessmentDTOAsync(params.userId);
    };
}
