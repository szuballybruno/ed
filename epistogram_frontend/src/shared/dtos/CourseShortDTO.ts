import { CourseStageNameType } from '../types/sharedTypes';

export class CourseShortDTO {
    courseId: number;
    currentItemCode: string;
    thumbnailImageURL: string;
    title: string;
    teacherName: string;
    categoryName: string;
    stageName: CourseStageNameType;
    subCategoryId: number;
    subCategoryName: string;
    isComplete: boolean;
    courseLength: number;
}