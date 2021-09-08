
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { staticProvider } from "../staticProvider";
import { toAnswerDTO, toQuestionAnswerDTO, toQuestionDTO } from "./mappings";

export const getStartupQuestionsAsync = async () => {

    const questions = await staticProvider
        .ormConnection
        .getRepository(Question)
        .createQueryBuilder("q")
        .where("q.isSignupQuestion = true")
        .leftJoinAndSelect("q.answers", "a")
        .getMany();

    return questions
        .map(x => toQuestionDTO(x));
}

export const getQuestionAnswersAsync = async (userId: number) => {

    const questionAnswers = await staticProvider
        .ormConnection
        .getRepository(QuestionAnswer)
        .createQueryBuilder("qa")
        .where("qa.userId = :userId", { userId })
        .leftJoinAndSelect("qa.question", "q")
        .where("q.isSignupQuestion = true")
        .getMany();

    return questionAnswers
        .map(qa => toQuestionAnswerDTO(qa));
}

export const getReandomQuestion = () => {
    return {
        questionId: 1,
        questionText: "What are the features of React? ",
        answers: [
            {
                answerId: 1,
                answerText: "It uses the virtual DOM instead of the real DOM."
            } as AnswerDTO,
            {
                answerId: 2,
                answerText: "It uses server-side rendering."
            } as AnswerDTO,
            {
                answerId: 3,
                answerText: "It follows uni-directional data flow or data binding."
            } as AnswerDTO,
            {
                answerId: 3,
                answerText: "It increases the application’s performance."
            } as AnswerDTO
        ]
    } as QuestionDTO
}