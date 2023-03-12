import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class AdminUserListView {

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
    averagePerformancePercentage: number;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    completedVideoCount: number;
}