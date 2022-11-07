import { CourseStageNameType } from '../types/sharedTypes';
import { Id } from '@episto/commontypes';

export class AvailableCourseDTO {
    courseId: Id<'Course'>;
    currentItemCode: string | null;
    thumbnailImageURL: string;
    title: string;
    teacherName: string;
    categoryId: Id<'CourseCategory'>;
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
    isStarted: boolean;
    completedVideoCount: number;
    requiredCompletionDate: Date;
    finalExamScorePercentage: number;
}
