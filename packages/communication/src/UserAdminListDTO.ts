import { Id } from '@episto/commontypes';

export class UserAdminListDTO {
    userId: Id<'User'>;
    companyId: Id<'Company'>;
    userEmail: string;
    signupDate: Date;
    firstName: string;
    lastName: string;
    avatarFilePath: string;
    summerizedScoreAvg: number;
    totalSessionLengthSeconds: number;
    engagementPoints: number;
    completedVideoCount: number;
    productivityPercentage: number | null;
    invertedLagBehind: number | null;
    reactionTime: number | null;
}