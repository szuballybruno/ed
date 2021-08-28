import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { verifyJWTToken } from "./misc/jwtGen";
import { getStartupQuestionsAsync, getQuestionAnswersAsync } from "./questionService";

export const saveSignupQuestionnaireAnswersAsync = async (invitationToken: string, answers: QuestionAnswerDTO[]) => {

    const invitationTokenPayload = verifyJWTToken<InvitationTokenPayload>(
        invitationToken, staticProvider.globalConfig.mail.tokenMailSecret);

    const userId = invitationTokenPayload.userId;

    const repo = staticProvider
        .ormConnection
        .getRepository(QuestionAnswer);

    // TODO DELETE PREVIOUS
    // const quesitonIds = answers.map(x => x.questionId);

    // const ids = await repo
    //     .createQueryBuilder("qa")
    //     .where("qa.userId = :userId AND qa.quesitonId IN :questionIds", { userId, quesitonIds })
    //     .select("qa.id")
    //     .getMany();

    // console.log(ids);

    const questionAnswers = answers
        .map(x => ({
            answerId: x.answerId,
            questionId: x.questionId,
            userId: userId
        } as QuestionAnswer))

    await repo.insert(questionAnswers);
}

export const getSignupDataAsync = async (invitationToken: string) => {

    const invitationTokenPayload = verifyJWTToken<InvitationTokenPayload>(
        invitationToken, staticProvider.globalConfig.mail.tokenMailSecret);

    const userId = invitationTokenPayload.userId;
    const questions = await getStartupQuestionsAsync();
    const questionAnswers = await getQuestionAnswersAsync(userId);

    const dataDTO = {
        questions: questions,
        questionAnswers: questionAnswers
    } as SignupDataDTO;

    return dataDTO;
}