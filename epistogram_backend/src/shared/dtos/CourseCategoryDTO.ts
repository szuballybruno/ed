import { CourseCategory } from "../../models/entity/CourseCategory";
import { Id } from "../types/versionId";

export type CourseCategoryDTO = {
    id: Id<'CourseCategory'>;
    name: string;
    childCategories: CourseCategoryDTO[]
}