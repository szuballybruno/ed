import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { CourseItemDTO } from "./CourseItemDTO";
import { UserDTO } from "./UserDTO";

export type CourseEditDataDTO = {
    courseId: number,
    title: string,
    thumbnailURL: string,

    courseItems: CourseItemDTO[];
    category: CourseCategoryDTO,
    subCategory: CourseCategoryDTO,
    teacher: UserDTO;

    teachers: UserDTO[];
    categories: CourseCategoryDTO[];
}