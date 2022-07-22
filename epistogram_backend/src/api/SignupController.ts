import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { SignupService } from '../services/SignupService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';

export class SignupController {

    private _signupService: SignupService;
    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: ServiceProvider) {

        this._signupService = serviceProvider.getService(SignupService);
        this._personalityAssessmentService = serviceProvider.getService(PersonalityAssessmentService);
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
