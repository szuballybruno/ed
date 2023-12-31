import { Id } from '@episto/commontypes';
import { AnswerSignupQuestionDTO, SurveyDataDTO } from '@episto/communication';
import { AnswerData } from '../models/tables/AnswerData';
import { AnswerVersion } from '../models/tables/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../models/tables/AnswerGivenAnswerBridge';
import { AnswerSession } from '../models/tables/AnswerSession';
import { GivenAnswer } from '../models/tables/GivenAnswer';
import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { PrincipalId } from '@episto/x-core';
import { CompanyService } from './CompanyService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { PermissionService } from './PermissionService';
import { FeatureService } from './FeatureService';

export class SignupService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _permissionService: PermissionService;
    private _companyService: CompanyService;
    private _featureService: FeatureService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        permissionService: PermissionService,
        companyService: CompanyService,
        featureService: FeatureService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._permissionService = permissionService;
        this._companyService = companyService;
        this._featureService = featureService;
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

    async checkIfSurveySkippableAsync(principalId: PrincipalId, userId?: Id<'User'>) {

        const userIdOrPrincipalId = userId ? userId : principalId;

        const isSignupEnabled = await this._featureService
            .checkFeatureAsync(principalId, {
                userId: userId,
                featureCode: 'SIGNUP_SURVEY'
            })

        const userSignupCompltedView = await this._ormService
            .query(SignupCompletedView, { userId: userIdOrPrincipalId })
            .where('userId', '=', 'userId')
            .getOneOrNull();

        const isSignupCompleted = !!userSignupCompltedView?.isSignupComplete;

        if (isSignupCompleted)
            return true;

        if (!isSignupEnabled)
            return true;

        return false;
    }

    /*     async completeSignupSurveyAsync(principalId: PrincipalId) {
    
            const companyId = await this._companyService
                .getPrincipalCompanyId(principalId);
    
            const userId = principalId.getId();
    
            const isPermAssigned = await this
                ._permissionService
                .getPermissionAsync(userId, 'BYPASS_SURVEY', { companyId });
    
            if (isPermAssigned)
                return;
    
            await this._permissionService
                .assignPermission(userId, 'BYPASS_SURVEY', { companyId: companyId });
        } */

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
            });
    }
}
