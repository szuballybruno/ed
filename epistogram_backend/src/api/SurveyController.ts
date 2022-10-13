import {AnswerSignupQuestionDTO} from '../shared/dtos/AnswerSignupQuestionDTO';
import {PersonalityAssessmentService} from '../services/PersonalityAssessmentService';
import {SignupService} from '../services/SignupService';
import {ActionParams} from '../utilities/XTurboExpress/ActionParams';
import {XControllerAction} from '../utilities/XTurboExpress/XTurboExpressDecorators';
import {apiRoutes} from '../shared/types/apiRoutes';
import {ServiceProvider} from '../startup/servicesDI';
import {XController} from '../utilities/XTurboExpress/XTurboExpressTypes';

export class SurveyController implements XController<SurveyController> {

    private _signupService: SignupService;
    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: ServiceProvider) {

        this._signupService = serviceProvider.getService(SignupService);
        this._personalityAssessmentService = serviceProvider.getService(PersonalityAssessmentService);
    }

    @XControllerAction(apiRoutes.survey.answerSurveyQuestion, {isPost: true})
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

    @XControllerAction(apiRoutes.survey.getUserPersonalityData)
    getUserPersonalityDataAction(params: ActionParams) {

        return this._personalityAssessmentService
            .getUserPersonalityAssessmentDTOAsync(params.principalId);
    }
}
