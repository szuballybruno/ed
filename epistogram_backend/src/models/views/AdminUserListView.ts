import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AdminUserListView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

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
    companyId: number;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    jobTitleId: number;

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