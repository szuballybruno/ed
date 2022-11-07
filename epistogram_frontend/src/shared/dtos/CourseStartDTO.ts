import { CourseStageNameType } from '../types/sharedTypes';
import { Id } from '../types/versionId';

export class CourseStartDTO {
    courseId: Id<'Course'>;
    stageName: CourseStageNameType;
    currentItemCode: string | null;
}