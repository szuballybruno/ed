import { Id, UserPerformanceRating } from '@episto/commontypes';
import { CourseCategoryMinimalDTO } from './CourseCategoryMinimalDTO';

export class CourseAdminListItemDTO {
    courseId: Id<'Course'>;
    title: string;
    thumbnailImageURL: string;
    category: CourseCategoryMinimalDTO;
    allUserCount: number;
    allUserCountChange: number;
    currentUserCount: number;
    completedByUsersCount: number;
    abandonedUserCount: number;
    averageUserPerformance: UserPerformanceRating;
    unansweredQuestionCount: number;
    difficultVideoCount: number;
}