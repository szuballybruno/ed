import { CourseStageNameType } from '../types/sharedTypes';
import { Id } from '../types/versionId';

export class AvailableCourseDTO {
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
	totalVideoSumLengthSeconds: number;
    totalVideoCount: number;
	difficulty: number;
    benchmark: number;
}