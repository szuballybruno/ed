import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AdminUserListView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    isInvitationAccepted: boolean;

    @ViewColumn()
    canAccessApplication: boolean;

    @ViewColumn()
    isTrusted: boolean;

    @ViewColumn()
    registrationType: string;

    @ViewColumn()
    email: string;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;

    @ViewColumn()
    roleId: number;

    @ViewColumn()
    companyId: number;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    jobTitleId: number;

    @ViewColumn()
    jobTitleName: string;

    @ViewColumn()
    latestActivityDate: Date;

    @ViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    avatarFilePath: string;

    @ViewColumn()
    coinBalance: number;
}