import { AnswerEditDTO } from './AnswerEditDTO';

export type QuestionEditDataDTO = {
    questionId: number,
    questionText: string;
    answers: AnswerEditDTO[];
}