import { Course } from '../../models/entity/course/Course';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { CourseStageNameType } from '../types/sharedTypes';
import { Id } from '../types/versionId';

export class CourseShortDTO {
    courseId: Id<'Course'>;
    currentItemCode: string | null;
    thumbnailImageURL: string;
    title: string;
    teacherName: string;
    categoryName: string;
    stageName: CourseStageNameType;
    subCategoryId: Id<'CourseCategory'>;
    subCategoryName: string;
    isComplete: boolean;
    courseLength: number;
}