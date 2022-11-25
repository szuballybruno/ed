import { AnswerSignupQuestionDTO } from '@episto/communication';
import { PersonalityAssessmentService } from '@episto/server-services';
import { SignupService } from '@episto/server-services';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class SurveyController implements XController<SurveyController> {

    private _signupService: SignupService;
    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: ServiceProvider) {

        this._signupService = serviceProvider.getService(SignupService);
        this._personalityAssessmentService = serviceProvider.getService(PersonalityAssessmentService);
    }

    @XControllerAction(apiRoutes.survey.answerSurveyQuestion, { isPost: true })
    answerSignupQuestionAction(params: ActionParams) {

        const dto = params
            .getBody<AnswerSignupQuestionDTO>(['answerVersionId', 'questionVersionId'])
            .data;

        return this._signupService
            .answerSignupQuestionAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.survey.getSurveyData)
    getSignupDataAction = (params: ActionParams) => {

        return this._signupService
            .getSignupDataAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.survey.completeSignupSurvey, { isPost: true })
    completeSignupSurveyAction = (params: ActionParams) => {

        return this._signupService
            .completeSignupSurveyAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.survey.getUserPersonalityData)
    getUserPersonalityDataAction(params: ActionParams) {

        return this._personalityAssessmentService
            .getUserPersonalityAssessmentDTOAsync(params.principalId);
    }
}
