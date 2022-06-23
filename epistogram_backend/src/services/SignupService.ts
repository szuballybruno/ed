import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { EmailService } from './EmailService';
import { toSignupDataDTO } from './misc/mappings';
import { SQLFunctionsService } from './sqlServices/FunctionsService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PrincipalId } from '../utilities/ActionParams';

export class SignupService {

    private _emailService: EmailService;
    private _sqlFuncService: SQLFunctionsService;
    private _ormService: ORMConnectionService;

    constructor(
        emailService: EmailService,
        sqlFuncService: SQLFunctionsService,
        ormService: ORMConnectionService) {

        this._emailService = emailService;
        this._sqlFuncService = sqlFuncService;
        this._ormService = ormService;
    }

    async answerSignupQuestionAsync(principalId: PrincipalId, questionAnswer: AnswerSignupQuestionDTO) {

        const userId = principalId.toSQLValue();

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

        return toSignupDataDTO(questions, userSignupCompltedView.isSignupComplete);
    }
}
