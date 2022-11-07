import { Id } from '@episto/commontypes';

export class UserActiveCourseDTO {
    courseId: Id<'Course'>;
    title: string;
    coverFilePath: string;
}