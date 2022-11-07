import { Id } from '../types/versionId';

export class CourseLearningDTO {
    courseId: Id<'Course'>;
    thumbnailImageURL: string;
    title: string;
    teacherName: string;
    categoryName: string;
    subCategoryName: string;
    currentItemCode: string;
    firstItemCode: string;
    isComplete: boolean;
    totalSpentSeconds: number;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    totalVideoCount: number;
    completedVideoCount: number;
    totalVideoQuestionCount: number;
    answeredVideoQuestionCount: number;
    examSuccessRateAverage: number;
    questionSuccessRate: number;
    finalExamSuccessRate: number;
}