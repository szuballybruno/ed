import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { UserDTO } from "./UserDTO";

export class CourseAdminListItemDTO {
    courseId: number;
    title: string;
    thumbnailImageURL: string;
    videosCount: number;
    examCount: number;
    category: CourseCategoryDTO;
    subCategory: CourseCategoryDTO;
    teacher: UserDTO;
}