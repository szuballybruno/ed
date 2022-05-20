import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { SignupService } from '../services/SignupService';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';

export class SignupController {

    private _signupService: SignupService;
    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(signupService: SignupService, personalityAssessmentService: PersonalityAssessmentService) {

        this._signupService = signupService;
        this._personalityAssessmentService = personalityAssessmentService;
    }

    @XControllerAction(apiRoutes.signup.answerSignupQuestion, { isPost: true })
    answerSignupQuestionAction = async (params: ActionParams) => {

        const dto = params
            .getBody<AnswerSignupQuestionDTO>(['answerId', 'questionId'])
            .data;

        await this._signupService
            .answerSignupQuestionAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.signup.getSignupData)
    getSignupDataAction = (params: ActionParams) => {

        return this._signupService
            .getSignupDataAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.signup.getUserPersonalityData)
    getUserPersonalityDataAction = async (params: ActionParams) => {

        return this._personalityAssessmentService
            .getUserPersonalityAssessmentDTOAsync(params.principalId);
    };
}
