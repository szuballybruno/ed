import { AnswerSession } from '../models/entity/AnswerSession';
import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { SignupDataDTO } from '../shared/dtos/SignupDataDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
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

    answerSignupQuestionAsync(principalId: PrincipalId, questionAnswer: AnswerSignupQuestionDTO): ControllerActionReturnType {

        return {
            action: async () => {
                const userId = Id
                    .create<'User'>(principalId.toSQLValue());

                const signupAnswerSession = await this._ormService
                    .query(AnswerSession, { examVersionId: 1 })
                    .where('examVersionId', '=', 'examVersionId')
                    .getOneOrNull();

                if (!signupAnswerSession)
                    await this._ormService
                        .createAsync(AnswerSession, {
                            startDate: new Date(Date.now()),
                            endDate: null,
                            isPractise: false,
                            isCompleted: false,
                            examVersionId: Id.create<'ExamVersion'>(1),
                            videoVersionId: null,
                            userId: userId
                        });

                await this._sqlFuncService
                    .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }


    }

    getSignupDataAsync(principalId: PrincipalId): ControllerActionReturnType {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                const userSignupCompltedView = await this._ormService
                    .query(SignupCompletedView, { userId })
                    .where('userId', '=', 'userId')
                    .getSingle();

                const questions = await this._ormService
                    .query(SignupQuestionView, { userId })
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService.mapTo(SignupDataDTO, [questions, userSignupCompltedView.isSignupComplete]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }
    }
}
