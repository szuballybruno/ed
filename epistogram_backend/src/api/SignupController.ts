import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { SignupService } from '../services/SignupService';
import { ActionParams, withValueOrBadRequest } from '../utilities/helpers';

export class SignupController {

    private _signupService: SignupService;
    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(signupService: SignupService, personalityAssessmentService: PersonalityAssessmentService) {

        this._signupService = signupService;
        this._personalityAssessmentService = personalityAssessmentService;
    }

    answerSignupQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<AnswerSignupQuestionDTO>(params.req.body);

        await this._signupService
            .answerSignupQuestionAsync(params.currentUserId, dto);
    };

    getSignupDataAction = (params: ActionParams) => {

        return this._signupService
            .getSignupDataAsync(params.currentUserId);
    };

    getUserPersonalityDataAction = async (params: ActionParams) => {

        return this._personalityAssessmentService
            .getUserPersonalityAssessmentDTOAsync(params.currentUserId);
    };
}
