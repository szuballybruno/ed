import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserOverviewView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    @ViewColumn()
    userEmail: string;

    @XViewColumn()
    @ViewColumn()
    firstName: string;

    @XViewColumn()
    @ViewColumn()
    lastName: string;

    @XViewColumn()
    @ViewColumn()
    signupDate: Date;

    @XViewColumn()
    @ViewColumn()
    avatarFilePath: string;

    @XViewColumn()
    @ViewColumn()
    averagePerformancePercentage: number;

    @XViewColumn()
    @ViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    @ViewColumn()
    engagementPoints: number;

    @XViewColumn()
    @ViewColumn()
    completedCourseItemCount: number;
}