import { Id } from '../types/versionId';

export class UserOverviewDTO {
    userId: Id<'User'>;
    companyId: Id<'Company'>;
    userEmail: string;
    firstName: string;
    lastName: string;
    avatarFilePath: string;
    averagePerformancePercentage: number;
    totalSessionLengthSeconds: number;
    engagementPoints: number;
    completedCourseItemCount: number;
    productivityPercentage: number;
    invertedLagBehind: number;
}