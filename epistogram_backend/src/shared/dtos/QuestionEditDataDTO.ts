import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { Id } from '../types/versionId';
import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataDTO {
    examVersionId: Id<ExamVersion> | null;
    videoVersionId: Id<VideoVersion> | null;
    questionVersionId: Id<QuestionVersion>;
    questionText: string;
    questionShowUpTimeSeconds?: number;

    answers: AnswerEditDTO[];
}