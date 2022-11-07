import { Id } from '@episto/commontypes';

export class CompanyAssociatedCourseDTO {
    courseId: Id<'Course'>;
    coverUrl: string;
    title: string;
    isAssociated: boolean;
    isDefault: boolean;
}