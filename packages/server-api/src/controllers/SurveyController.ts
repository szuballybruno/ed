import { AnswerSignupQuestionDTO } from '@episto/communication';
import { PersonalityAssessmentService } from '@episto/server-services';
import { SignupService } from '@episto/server-services';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class SurveyController implements Controller<SurveyController> {

    private _signupService: SignupService;
    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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
