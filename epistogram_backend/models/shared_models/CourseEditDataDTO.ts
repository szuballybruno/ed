import { CourseAdminItemShortDTO } from "./CourseAdminItemShortDTO";
import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { ModuleEditDTO } from "./ModuleEditDTO";
import { UserDTO } from "./UserDTO";

export type CourseEditDataDTO = {
    courseId: number,
    title: string,
    thumbnailURL: string,

    modules: ModuleEditDTO[];
    category: CourseCategoryDTO,
    subCategory: CourseCategoryDTO,
    teacher: UserDTO;

    teachers: UserDTO[];
    categories: CourseCategoryDTO[];
}