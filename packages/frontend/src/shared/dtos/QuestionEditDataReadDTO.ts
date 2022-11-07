import { Id } from '../types/versionId';
import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataReadDTO {
    examVersionId: Id<'ExamVersion'> | null;
    videoVersionId: Id<'VideoVersion'> | null;
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    questionShowUpTimeSeconds?: number;

    moduleId: Id<'Module'>;
    answers: AnswerEditDTO[];
}