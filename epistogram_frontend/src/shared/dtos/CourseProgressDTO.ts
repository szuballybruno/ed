import { CourseItemDTO } from './CourseItemDTO';

export class CourseProgressDTO {
    title: string;
    continueItemCode: string;
    progressPercentage: number;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    nextItems: CourseItemDTO[];
}