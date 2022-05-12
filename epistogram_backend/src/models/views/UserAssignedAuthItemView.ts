import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAssignedAuthItemView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    permissionId: number | null;

    @ViewColumn()
    roleId: number | null;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    isRole: boolean;
}