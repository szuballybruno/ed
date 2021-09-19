
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";

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