import { AnswerEditDTO } from "./AnswerEditDTO";

export type QuestionEditDataDTO = {
    questionId: number,
    questionText: string;
    typeId: number;
    answers: AnswerEditDTO[];
}