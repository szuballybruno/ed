import { Id } from '../../types/versionId';

export class CourseCategoryMinimalDTO {
    id: Id<'CourseCategory'>;
    name: string;
}