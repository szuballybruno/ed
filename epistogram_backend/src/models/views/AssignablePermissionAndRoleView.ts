import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignablePermissionAndRoleView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    permissionId: number | null;

    @ViewColumn()
    permissionCode: string | null;

    @ViewColumn()
    roleId: number | null;

    @ViewColumn()
    roleName: string | null;
}
