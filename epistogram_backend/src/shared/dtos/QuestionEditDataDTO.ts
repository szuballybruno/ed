import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataDTO {
    questionId: number;
    questionText: string;
    answers: AnswerEditDTO[];
}