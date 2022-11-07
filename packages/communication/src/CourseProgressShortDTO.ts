import { Id } from '@episto/commontypes';

export class CourseProgressShortDTO {
    courseId: Id<'Course'>;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    progressPercentage: number;
    courseTitle: string;
}