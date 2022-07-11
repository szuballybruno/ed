import { Id } from '../types/versionId';
import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataDTO {
    examVersionId: Id<'ExamVersion'> | null;
    videoVersionId: Id<'VideoVersion'> | null;
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    questionShowUpTimeSeconds?: number;

    answers: AnswerEditDTO[];
}