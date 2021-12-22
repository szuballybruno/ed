import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { SignupCompletedView } from "../models/views/SignupCompletedView";
import { SignupQuestionView } from "../models/views/SignupQuestionView";
import { staticProvider } from "../staticProvider";
import { EmailService } from "./EmailService";
import { toSignupDataDTO } from "./misc/mappings";

export class SignupService {

    private _emailService: EmailService;

    constructor(emailService: EmailService) {

        this._emailService = emailService;
    }

    async answerSignupQuestionAsync(userId: number, questionAnswer: AnswerSignupQuestionDTO) {

        await staticProvider
            .services
            .sqlFunctionService
            .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
    }

    async getSignupDataAsync(userId: number) {

        const userSignupCompltedView = await staticProvider
            .ormConnection
            .getRepository(SignupCompletedView)
            .findOneOrFail({
                where: {
                    userId
                }
            });

        const questions = await staticProvider
            .ormConnection
            .getRepository(SignupQuestionView)
            .createQueryBuilder("sqv")
            .where("sqv.userId = :userId", { userId })
            .getMany();

        return toSignupDataDTO(questions, userSignupCompltedView.isSignupComplete);
    }
}
