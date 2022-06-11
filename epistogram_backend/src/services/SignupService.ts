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

        await this._sqlFuncService
            .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
    }

    async getSignupDataAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

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

        return this._mapperService.mapTo(SignupDataDTO, [questions, userSignupCompltedView.isSignupComplete]);
    }
}
