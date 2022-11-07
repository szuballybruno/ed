import { Id } from '@episto/commontypes';
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