import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserOverviewView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    firstName: string;

    @XViewColumn()
    lastName: string;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userEmail: string;

    @XViewColumn()
    signupDate: Date;

    @XViewColumn()
    username: string;

    @XViewColumn()
    avatarFilePath: string;

    @XViewColumn()
    summerizedScoreAvg: number;

    @XViewColumn()
    averagePerformancePercentage: number;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    engagementPoints: number;

    @XViewColumn()
    reactionTime: number;
}