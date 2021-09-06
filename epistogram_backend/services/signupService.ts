import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { User } from "../models/entity/User";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { verifyJWTToken } from "./misc/jwtGen";
import { getQuestionAnswersAsync, getStartupQuestionsAsync } from "./questionService";

export const saveSignupQuestionAnswerAsync = async (invitationToken: string, questionAnswer: QuestionAnswerDTO) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);

    const repo = staticProvider
        .ormConnection
        .getRepository(QuestionAnswer);

    const qa = await repo
        .createQueryBuilder("qa")
        .where("qa.userId = :userId ", { userId })
        .andWhere("qa.questionId = :questionId", { questionId: questionAnswer.questionId })
        .andWhere("qa.answerId = :answerId", { answerId: questionAnswer.answerId })
        .select("qa.id")
        .getOne();

    await repo.save({
        id: qa?.id,
        answerId: questionAnswer.answerId,
        questionId: questionAnswer.questionId,
        userId: userId
    });
}

export const getSignupDataAsync = async (invitationToken: string) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);
    const questions = await getStartupQuestionsAsync();
    const questionAnswers = await getQuestionAnswersAsync(userId);

    const dataDTO = {
        questions: questions,
        questionAnswers: questionAnswers
    } as SignupDataDTO;

    return dataDTO;
}

const verifyInvitationTokenAsync = async (invitationToken: string) => {

    const invitationTokenPayload = verifyJWTToken<InvitationTokenPayload>(
        invitationToken, staticProvider.globalConfig.mail.tokenMailSecret);

    const userId = invitationTokenPayload.userId;

    const user = await staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("u")
        .where("u.id = :userId", { userId })
        .getOneOrFail();

    // check if token matches user's in the DB
    // this also protects agains modifying users data 
    // with the same token after the user is registerd,
    // since the token is removed from the DB after finalization
    if (user.invitationToken != invitationToken)
        throw new TypedError("Bad token.", "bad request");

    return userId;
}