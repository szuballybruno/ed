import { Id, PerformanceRatingType, TempoRatingType } from '@episto/commontypes';

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

    // tempo 
    avgTempoPercentage: number;
    hasAvgTempoPercentage: boolean;
    tempoRating: TempoRatingType;

    // performance
    avgPerformancePercentage: number;
    avgPerformancePercentageRating: PerformanceRatingType;
}