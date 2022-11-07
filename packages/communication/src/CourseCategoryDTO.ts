import { Id } from '@episto/commontypes';

export class CourseCategoryDTO {
    id: Id<'CourseCategory'>;
    name: string;
    childCategories: CourseCategoryDTO[];
}