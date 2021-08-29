import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { User } from "../models/entity/User";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { verifyJWTToken } from "./misc/jwtGen";
import { getQuestionAnswersAsync, getStartupQuestionsAsync } from "./questionService";

export const saveSignupQuestionnaireAnswersAsync = async (invitationToken: string, answers: QuestionAnswerDTO[]) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);

    const repo = staticProvider
        .ormConnection
        .getRepository(QuestionAnswer);

    // delete previous answers
    const questionIds = answers.map(x => x.questionId);

    const qas = await repo
        .createQueryBuilder("qa")
        .where("qa.userId = :userId ", { userId })
        .andWhere("qa.questionId IN (:...questionIds)", { questionIds })
        .select("qa.id")
        .getMany();

    if (qas.length > 0)
        await repo
            .createQueryBuilder()
            .delete()
            .from(QuestionAnswer)
            .where("id IN (:...ids)", { ids: qas.map(x => x.id) })
            .execute();

    // insert new answers
    const questionAnswers = answers
        .map(x => ({
            answerId: x.answerId,
            questionId: x.questionId,
            userId: userId
        } as QuestionAnswer))

    await repo.save(questionAnswers);
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