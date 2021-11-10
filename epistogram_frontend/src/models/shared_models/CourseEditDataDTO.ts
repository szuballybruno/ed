import { CourseAdminItemShortDTO } from "./CourseAdminItemShortDTO";
import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { UserDTO } from "./UserDTO";

export type CourseEditDataDTO = {
    courseId: number,
    title: string,
    thumbnailURL: string,

    courseItems: CourseAdminItemShortDTO[];
    category: CourseCategoryDTO,
    subCategory: CourseCategoryDTO,
    teacher: UserDTO;

    teachers: UserDTO[];
    categories: CourseCategoryDTO[];
}