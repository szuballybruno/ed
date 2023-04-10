import { Id, InvertedLagBehindRatingType, OverallScoreRatingType } from '@episto/commontypes';

export class UserAdminListDTO {
    userId: Id<'User'>;
    companyId: Id<'Company'>;
    userEmail: string;
    signupDate: Date;
    firstName: string;
    lastName: string;
    avatarFilePath: string;
    summerizedScoreAvg: number;
    summerizedScoreAvgRatingText: OverallScoreRatingType;
    totalSessionLengthSeconds: number;
    engagementPoints: number;
    completedVideoCount: number;
    productivityPercentage: number | null;
    invertedRelativeUserPaceDiff: number | null;
    invertedRelativeUserPaceDiffRatingText: InvertedLagBehindRatingType | null;
    reactionTime: number | null;
    username: string;
}