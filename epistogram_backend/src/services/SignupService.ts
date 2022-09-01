import {SignupCompletedView} from '../models/views/SignupCompletedView';
import {SignupQuestionView} from '../models/views/SignupQuestionView';
import {AnswerSignupQuestionDTO} from '../shared/dtos/AnswerSignupQuestionDTO';
import {SignupDataDTO} from '../shared/dtos/SignupDataDTO';
import {PrincipalId} from '../utilities/XTurboExpress/ActionParams';
import {AuthorizationResult} from '../utilities/XTurboExpress/XTurboExpressTypes';
import {AuthorizationService} from './AuthorizationService';
import {EmailService} from './EmailService';
import {MapperService} from './MapperService';
import {ORMConnectionService} from './ORMConnectionService/ORMConnectionService';
import {SQLFunctionsService} from './sqlServices/FunctionsService';
import {Id} from '../shared/types/versionId';
import {AnswerSession} from '../models/entity/AnswerSession';
import {QuestionAnswerService} from './QuestionAnswerService';
import {AnswerVersion} from '../models/entity/answer/AnswerVersion';
import {AnswerData} from '../models/entity/answer/AnswerData';

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

    async answerSignupQuestionAsync(principalId: PrincipalId, questionAnswer: AnswerSignupQuestionDTO) {

        const userId = principalId.getId();

        await this
            .answerSignupQuestion(
                userId,
                questionAnswer.questionVersionId,
                questionAnswer.answerVersionId
            );
    }

    getSignupDataAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                const userSignupCompltedView = await this._ormService
                    .query(SignupCompletedView, {userId})
                    .where('userId', '=', 'userId')
                    .getOneOrNull();

                const questions = await this._ormService
                    .query(SignupQuestionView, {userId})
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService.mapTo(SignupDataDTO, [questions, !!userSignupCompltedView?.isSignupComplete]);
            },
            auth: async () => {
                return AuthorizationResult.ok;
            }
        };
    }

    private async answerSignupQuestion(
        userId: Id<'User'>,
        questionVersionId: Id<'QuestionVersion'>,
        answerVersionId: Id<'AnswerVersion'>
    ) {

        const answerSession = await this._ormService
            .query(AnswerSession, {userId, examVersionId: 1})
            .where('userId', '=', 'userId')
            .and('examVersionId', '=', 'examVersionId')
            .getSingle();

        const answerData = this._ormService
            .query(AnswerVersion, {answerVersionId})
            .innerJoin(AnswerData, x => x
                .on('id', '=', 'answerDataId', AnswerVersion)
                .and('isCorrect', '=', 'true'))
            .where('id', '=', 'answerVersionId')
            .getOneOrNull();

        const givenAnswerIsCorrect = !!answerData;

        await this._questionAnswerService
            .saveGivenAnswerAsync(
                false,
                questionVersionId,
                answerSession.id,
                givenAnswerIsCorrect,
                null,
                0,
                answerVersionId
            );
    }
}
