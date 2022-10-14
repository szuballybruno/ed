import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../models/entity/misc/AnswerGivenAnswerBridge';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { SurveyDataDTO } from '../shared/dtos/SurveyDataDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { CompanyService } from './CompanyService';
import { EmailService } from './EmailService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PermissionService } from './PermissionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';

export class SignupService {

    private _emailService: EmailService;
    private _sqlFuncService: SQLFunctionsService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;
    private _questionAnswerService: QuestionAnswerService;
    private _permissionService: PermissionService;
    private _companyService: CompanyService;

    constructor(
        emailService: EmailService,
        sqlFuncService: SQLFunctionsService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService,
        questionAnswerService: QuestionAnswerService,
        permissionService: PermissionService,
        companyService: CompanyService) {

        this._emailService = emailService;
        this._sqlFuncService = sqlFuncService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
        this._questionAnswerService = questionAnswerService;
        this._permissionService = permissionService;
        this._companyService = companyService;
    }

    /**
     * Answers a signup question  
     */
    async answerSignupQuestionAsync(principalId: PrincipalId, questionAnswer: AnswerSignupQuestionDTO) {

        const userId = principalId.getId();
        const { answerVersionId, questionVersionId } = questionAnswer;

        const answerSession = await this._ormService
            .query(AnswerSession, { userId, examVersionId: 1 })
            .where('userId', '=', 'userId')
            .and('examVersionId', '=', 'examVersionId')
            .getSingle();

        const answerData = await this._ormService
            .query(AnswerVersion, { answerVersionId })
            .innerJoin(AnswerData, x => x
                .on('id', '=', 'answerDataId', AnswerVersion)
                .and('isCorrect', '=', 'true'))
            .where('id', '=', 'answerVersionId')
            .getOneOrNull();

        const givenAnswerIsCorrect = !!answerData;

        await this._saveSignupQuestionAnswerAsync(
            questionVersionId,
            answerSession.id,
            answerVersionId,
            givenAnswerIsCorrect,
        );
    }

    async completeSignupSurveyAsync(principalId: PrincipalId) {

        const companyId = await this._companyService
            .getPrincipalCompanyId(principalId);

        const userId = principalId.getId();

        await this._permissionService
            .assignPermission(userId, 'BYPASS_SURVEY', { companyId: companyId });
    }

    async getSignupDataAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const userSignupCompltedView = await this._ormService
            .query(SignupCompletedView, { userId })
            .where('userId', '=', 'userId')
            .getOneOrNull();

        const questions = await this._ormService
            .query(SignupQuestionView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService.mapTo(SurveyDataDTO, [questions, !!userSignupCompltedView?.isSignupComplete]);
    }

    /**
     * Saves a signup question answer  
     */
    private async _saveSignupQuestionAnswerAsync(
        questionVersionId: Id<'QuestionVersion'>,
        answerSessionId: Id<'AnswerSession'>,
        answerVersionId: Id<'AnswerVersion'>,
        isCorrect: boolean) {

        const { id: givenAnswerId } = await this
            ._ormService
            .createAsync(GivenAnswer, {
                answerSessionId,
                creationDate: new Date(),
                deletionDate: null,
                elapsedSeconds: 0,
                givenAnswerStreakId: null,
                isPractiseAnswer: false,
                questionVersionId,
                score: 0,
                state: isCorrect ? 'CORRECT' : 'INCORRECT'
            });

        await this
            ._ormService
            .createAsync(AnswerGivenAnswerBridge, {
                answerVersionId,
                givenAnswerId,
                deletionDate: null,
                score: 0
            });
    }
}
