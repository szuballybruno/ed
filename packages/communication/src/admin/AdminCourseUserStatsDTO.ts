import { Id, UserPerformanceRating } from "@episto/commontypes";

export class AdminCourseUserStatsDTO {
    companyId: Id<'Company'>;
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    completedPercentage: number;
    completedVideoCount: number;
    completedExamCount: number;
    videoCount: number;
    examCount: number;
    totalSpentSeconds: number;
    finalExamScorePercentage: number;
    summerizedScore: number;
    completionDate: Date | null;
    performancePercentage: number;
    performanceRating: UserPerformanceRating;
    requiredCompletionDate: Date | null;
    estimatedCompletionDate: Date | null;
}

