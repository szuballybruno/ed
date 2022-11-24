import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserOverviewView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userEmail: string;

    @XViewColumn()
    firstName: string;

    @XViewColumn()
    lastName: string;

    @XViewColumn()
    signupDate: Date;

    @XViewColumn()
    avatarFilePath: string | null;

    @XViewColumn()
    summerizedScoreAvg: number;

    @XViewColumn()
    averagePerformancePercentage: number;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    engagementPoints: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    reactionTime: number;

    @XViewColumn()
    username: string;
}