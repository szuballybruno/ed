import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AdminUserListView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

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
    companyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    departmentId: Id<'Department'>;

    @ViewColumn()
    @XViewColumn()
    departmentName: string;

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