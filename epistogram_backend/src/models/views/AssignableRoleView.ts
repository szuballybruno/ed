import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignableRoleView {

    @ViewColumn()
    assignerUserId: number;

    @ViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    roleId: number;

    @ViewColumn()
    roleName: string;

    @ViewColumn()
    isAssigned: boolean;

    @ViewColumn()
    canAssign: boolean;

    @ViewColumn()
    permissionId: number;
}
