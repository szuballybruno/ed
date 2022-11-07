import { Id } from '../types/versionId';

export class CourseCategoryDTO {
    id: Id<'CourseCategory'>;
    name: string;
    childCategories: CourseCategoryDTO[];
}