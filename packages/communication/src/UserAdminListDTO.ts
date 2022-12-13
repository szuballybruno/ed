import { Id, UserPerformanceRating } from '@episto/commontypes';

export class UserAdminListDTO {
    userId: Id<'User'>;
    companyId: Id<'Company'>;
    userEmail: string;
    signupDate: Date;
    firstName: string;
    lastName: string;
    avatarFilePath: string;
    totalSessionLengthSeconds: number;
    username: string;
    completedVideoCount: number;
    performanceAverage: number;
    hasPerformanceAverage: boolean;
    performanceRating: UserPerformanceRating;
}