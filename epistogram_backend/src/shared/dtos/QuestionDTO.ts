import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { Id } from '../types/versionId';
import { AnswerDTO } from './AnswerDTO';

export type QuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    orderIndex: null | number;
    answers: AnswerDTO[];
    imageUrl?: string;
    showUpTimeSeconds?: number;
    typeId: number;
}