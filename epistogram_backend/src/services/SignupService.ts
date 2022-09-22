import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { SignupDataDTO } from '../shared/dtos/SignupDataDTO';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationResult } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';
import { EmailService } from './EmailService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';
import { Id } from '../shared/types/versionId';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { QuestionAnswerService } from './QuestionAnswerService';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerData } from '../models/entity/answer/AnswerData';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { AnswerGivenAnswerBridge } from '../models/entity/misc/AnswerGivenAnswerBridge';

export class SignupService {

    private _emailService: EmailService;
    private _sqlFuncService: SQLFunctionsService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;
    private _questionAnswerService: QuestionAnswerService;

    constructor(
        emailService: EmailService,
        sqlFuncService: SQLFunctionsService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService,
        questionAnswerService: QuestionAnswerService) {

        this._emailService = emailService;
        this._sqlFuncService = sqlFuncService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
        this._questionAnswerService = questionAnswerService;
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

        const answerData = this._ormService
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

    getSignupDataAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                const userSignupCompltedView = await this._ormService
                    .query(SignupCompletedView, { userId })
                    .where('userId', '=', 'userId')
                    .getOneOrNull();

                const questions = await this._ormService
                    .query(SignupQuestionView, { userId })
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService.mapTo(SignupDataDTO, [questions, !!userSignupCompltedView?.isSignupComplete]);
            },
            auth: async () => {
                return AuthorizationResult.ok;
            }
        };
    }

    /**
     * Saves a signup question answer  
     */
    private async _saveSignupQuestionAnswerAsync(
        questionVersionId: Id<'QuestionVersion'>,
        answerSessionId: Id<'AnswerSession'>,
        answerVersionId: Id<'AnswerVersion'>,
        isCorrect: boolean) {

        const givenAnswerId = await this
            ._ormService
            .createAsync(GivenAnswer, {
                answerSessionId,
                creationDate: new Date(),
                deletionDate: null,
                elapsedSeconds: 0,
                givenAnswerStreakId: null,
                isCorrect,
                isPractiseAnswer: false,
                questionVersionId
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
