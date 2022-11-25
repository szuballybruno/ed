import { Id } from "@episto/commontypes";

export class AdminCourseUserStatsDTO {
    companyId: Id<'Company'>;
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    completedPercentage: number;
    performancePercentage: number;
    completedVideoCount: number;
    completedExamCount: number;
    videoCount: number;
    examCount: number;
    totalSpentSeconds: number;
    finalExamScorePercentage: number;
    summerizedScore: number;
    requiredCompletionDate: Date | null;
    completionDate: Date | null;
    previsionedDate: Date | null;
    previsionedLagBehindDays: number | null;
    actualLagBehindDays: number | null;
}

