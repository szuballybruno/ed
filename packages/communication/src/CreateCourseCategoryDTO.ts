import { Id } from "@episto/commontypes";

export class CreateCourseCategoryDTO {
    name: string;
    parentCategoryId?: Id<'CourseCategory'>;
}