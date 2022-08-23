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

export class SignupService {

    private _emailService: EmailService;
    private _sqlFuncService: SQLFunctionsService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;

    constructor(
        emailService: EmailService,
        sqlFuncService: SQLFunctionsService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService) {

        this._emailService = emailService;
        this._sqlFuncService = sqlFuncService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
    }

    answerSignupQuestionAsync(principalId: PrincipalId, questionAnswer: AnswerSignupQuestionDTO) {

        return {
            action: async () => {

                const userId = principalId.getId();

                await this._sqlFuncService
                    .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
            },
            auth: async () => {
                return AuthorizationResult.ok;
            }
        };
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
}
