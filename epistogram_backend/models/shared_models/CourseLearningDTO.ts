
export class CourseLearningDTO {
    courseId: number;
    thumbnailImageURL: string;
    title: string;
    teacherName: string;
    categoryName: string;
    subCategoryName: string;
    isComplete: boolean;
    totalSpentTime: number;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    totalVideoCount: number;
    completedVideoCount: number;
    totalVideoQuestionCount: number;
    answeredVideoQuestionCount: number;
}