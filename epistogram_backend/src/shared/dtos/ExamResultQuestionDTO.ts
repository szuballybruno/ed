import { ResultAnswerDTO } from './ResultAnswerDTO';

export type ExamResultQuestionDTO = {
    text: string;
    correctAnswerRate: number;
    answers: ResultAnswerDTO[];
}