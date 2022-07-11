import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { Id } from '../types/versionId';
import { QuestionEditDataDTO } from './QuestionEditDataDTO';

export class CourseItemEditDTO {
    examVersionId: Id<'ExamVersion'>;
    videoVersionId: Id<'VideoVersion'>;
    title: string;
    subtitle: string;
    videoLengthSeconds: number | null;
    videoUrl: string | null;

    questions: QuestionEditDataDTO[];
}