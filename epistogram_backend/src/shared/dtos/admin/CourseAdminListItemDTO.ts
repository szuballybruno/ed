import { Course } from '../../../models/entity/course/Course';
import { Id } from '../../types/versionId';
import { CourseCategoryDTO } from '../CourseCategoryDTO';
import { TeacherDTO } from '../TeacherDTO';
import { UserDTO } from '../UserDTO';
import { CourseCategoryMinimalDTO } from './CourseCategoryMinimalDTO';

export class CourseAdminListItemDTO {
    courseId: Id<'Course'>;
    title: string;
    thumbnailImageURL: string;
    videosCount: number;
    examCount: number;
    category: CourseCategoryMinimalDTO;
    subCategory: CourseCategoryMinimalDTO;
    teacher: TeacherDTO;
}