import { Id, TempoRatingType } from '@episto/commontypes';

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
    avgTempoPercentage: number;
    hasAvgTempoPercentage: boolean;
    tempoRating: TempoRatingType;
}