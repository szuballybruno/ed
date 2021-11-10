import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { UserDTO } from "./UserDTO";

export type CourseAdminListItemDTO = {
    courseId: number,
    title: string,
    thumbnailImageURL: string,
    videosCount: number,
    examCount: number,
    category: CourseCategoryDTO,
    subCategory: CourseCategoryDTO,
    teacher: UserDTO,
}