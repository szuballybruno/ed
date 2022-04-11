import { AnswerSignupQuestionDTO } from '../shared/dtos/AnswerSignupQuestionDTO';
import { SignupCompletedView } from '../models/views/SignupCompletedView';
import { SignupQuestionView } from '../models/views/SignupQuestionView';
import { EmailService } from './EmailService';
import { toSignupDataDTO } from './misc/mappings';
import { SQLFunctionsService } from './sqlServices/FunctionsService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

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

    async answerSignupQuestionAsync(userId: number, questionAnswer: AnswerSignupQuestionDTO) {

        await this._sqlFuncService
            .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
    }

    async getSignupDataAsync(userId: number) {

        const userSignupCompltedView = await this._ormService
            .getRepository(SignupCompletedView)
            .findOneOrFail({
                where: {
                    userId
                }
            });

        const questions = await this._ormService
            .getRepository(SignupQuestionView)
            .createQueryBuilder('sqv')
            .where('sqv.userId = :userId', { userId })
            .getMany();

        return toSignupDataDTO(questions, userSignupCompltedView.isSignupComplete);
    }
}
