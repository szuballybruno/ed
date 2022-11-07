import { Id } from '../../types/versionId';

export class AdminHomePageOverviewDTO {
    companyId: Id<'Company'>;
    flaggedUsers: number;
    avgUsers: number;
    outstandingUsers: number;
    companyCourseStats: {
        courseId: Id<'Course'>;
        thumbnailUrl: string;
        title: string;
        activeUsersCount: number;
        suspendedUsersCount: number;
        completedUsersCount: number;
        avgCoursePerformancePercentage: number;
        difficultVideosCount: number;
        questionsWaitingToBeAnswered: number;
    }[];
}