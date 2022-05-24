import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserRoleView {

    @ViewColumn()
    roleAssignmentBridgeId: number;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    contextCompanyName: string;

    @ViewColumn()
    roleId: number;

    @ViewColumn()
    roleName: string;

    @ViewColumn()
    ownerCompanyId: number | null;

    @ViewColumn()
    ownerCompanyName: string | null;

    @ViewColumn()
    assigneeUserId: number;
}