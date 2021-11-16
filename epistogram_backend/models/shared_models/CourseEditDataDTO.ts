import { CourseAdminItemShortDTO } from "./CourseAdminItemShortDTO";
import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { ModuleAdminShortDTO } from "./ModuleAdminShortDTO";
import { UserDTO } from "./UserDTO";

export type CourseEditDataDTO = {
    courseId: number,
    title: string,
    thumbnailURL: string,

    modules: ModuleAdminShortDTO[];
    category: CourseCategoryDTO,
    subCategory: CourseCategoryDTO,
    teacher: UserDTO;

    teachers: UserDTO[];
    categories: CourseCategoryDTO[];
}