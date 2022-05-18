import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAssignedAuthItemView {

    @ViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    permissionId: number | null;

    @ViewColumn()
    roleId: number | null;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    isRole: boolean;
}