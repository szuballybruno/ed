import { Id } from '../../types/versionId';

export class CompanyAssociatedCourseDTO {
    courseId: Id<'Course'>;
    coverUrl: string;
    title: string;
}