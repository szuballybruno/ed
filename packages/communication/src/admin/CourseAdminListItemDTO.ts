import { Id } from '@episto/commontypes';
import { TeacherDTO } from '../TeacherDTO';
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