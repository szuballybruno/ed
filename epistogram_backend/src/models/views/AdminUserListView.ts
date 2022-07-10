import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Company } from '../entity/Company';
import { JobTitle } from '../entity/JobTitle';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AdminUserListView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    isInvitationAccepted: boolean;

    @ViewColumn()
    @XViewColumn()
    isTrusted: boolean;

    @ViewColumn()
    @XViewColumn()
    registrationType: string;

    @ViewColumn()
    @XViewColumn()
    email: string;

    @ViewColumn()
    @XViewColumn()
    firstName: string;

    @ViewColumn()
    @XViewColumn()
    lastName: string;

    @ViewColumn()
    @XViewColumn()
    companyId: Id<Company>;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    jobTitleId: Id<JobTitle>;

    @ViewColumn()
    @XViewColumn()
    jobTitleName: string;

    @ViewColumn()
    @XViewColumn()
    latestActivityDate: Date;

    @ViewColumn()
    @XViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    @XViewColumn()
    avatarFilePath: string;

    @ViewColumn()
    @XViewColumn()
    coinBalance: number;
}