import { AnswerDTO } from './AnswerDTO';

export type QuestionDTO = {
    questionVersionId: number;
    questionText: string;
    orderIndex: null | number;
    answers: AnswerDTO[];
    imageUrl?: string;
    showUpTimeSeconds?: number;
    typeId: number;
}