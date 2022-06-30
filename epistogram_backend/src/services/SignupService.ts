import { AnswerSession } from '../models/entity/AnswerSession';
import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { SignupDataDTO } from '../shared/dtos/SignupDataDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { EmailService } from './EmailService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';

export class SignupService {

    private _emailService: EmailService;
    private _sqlFuncService: SQLFunctionsService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(
        emailService: EmailService,
        sqlFuncService: SQLFunctionsService,
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        this._emailService = emailService;
        this._sqlFuncService = sqlFuncService;
        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    async answerSignupQuestionAsync(principalId: PrincipalId, questionAnswer: AnswerSignupQuestionDTO) {

        const userId = principalId.toSQLValue();

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
                    examVersionId: 1,
                    videoVersionId: null,
                    userId: userId
                })

        await this._sqlFuncService
            .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
    }

    async getSignupDataAsync(principalId: PrincipalId) {

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
    }
}
