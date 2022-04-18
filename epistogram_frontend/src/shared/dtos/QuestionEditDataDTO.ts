import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataDTO {
    videoId: number | null;
    examId: number | null;
    questionId: number;
    questionText: string;
    questionShowUpTimeSeconds?: number;
    answers: AnswerEditDTO[];
}