import { SignupAnswerDTO } from "./SignupAnswerDTO";

export type SignupQuestionDTO = {
    questionId: number;
    questionText: string;
    imageUrl: string;
    typeId: number;
    answers: SignupAnswerDTO[];
}