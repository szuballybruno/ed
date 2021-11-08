import { AnswerDTO } from "./AnswerDTO";

export type PractiseQuestionDTO = {
    questionId: number;
    questionText: string;
    answers: AnswerDTO[];
    typeId: number;
}