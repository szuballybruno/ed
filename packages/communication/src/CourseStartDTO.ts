import { CourseStageNameType } from '../types/sharedTypes';
import { Id } from '@episto/commontypes';

export class CourseStartDTO {
    courseId: Id<'Course'>;
    stageName: CourseStageNameType;
    currentItemCode: string | null;
}