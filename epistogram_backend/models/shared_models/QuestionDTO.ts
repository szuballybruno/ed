import { AnswerDTO } from "./AnswerDTO";

export type QuestionDTO = {
    questionId: number;
    questionText: string;
    answers: AnswerDTO[];
    imageUrl?: string;
    showUpTimeSeconds?: number;
}