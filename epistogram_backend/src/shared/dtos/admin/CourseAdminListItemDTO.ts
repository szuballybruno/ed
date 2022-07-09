import { CourseCategoryDTO } from '../CourseCategoryDTO';
import { TeacherDTO } from '../TeacherDTO';
import { UserDTO } from '../UserDTO';
import { CourseCategoryMinimalDTO } from './CourseCategoryMinimalDTO';

export class CourseAdminListItemDTO {
    courseId: number;
    title: string;
    thumbnailImageURL: string;
    videosCount: number;
    examCount: number;
    category: CourseCategoryMinimalDTO;
    subCategory: CourseCategoryMinimalDTO;
    teacher: TeacherDTO;
}