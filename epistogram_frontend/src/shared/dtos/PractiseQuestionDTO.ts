import { AnswerDTO } from './AnswerDTO';

export type PractiseQuestionDTO = {
    questionVersionId: number;
    questionText: string;
    answers: AnswerDTO[];
    typeId: number;
}