import { AnswerDTO } from './AnswerDTO';

export type QuestionDTO = {
    questionId: number;
    questionText: string;
    orderIndex: null | number;
    answers: AnswerDTO[];
    imageUrl?: string;
    showUpTimeSeconds?: number;
    typeId: number;
}