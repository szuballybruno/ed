import { Id } from '../types/versionId';
import { AnswerDTO } from './AnswerDTO';

export class QuestionDTO {
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    orderIndex: null | number;
    answers: AnswerDTO[];
    imageUrl?: string;
    showUpTimeSeconds?: number;
    typeId: number;
}