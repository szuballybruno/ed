import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserRoleView {

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    contextCompanyName: string;

    @ViewColumn()
    roleId: number;

    @ViewColumn()
    roleName: string;

    @ViewColumn()
    ownerCompanyId: number;

    @ViewColumn()
    ownerCompanyName: string;

    @ViewColumn()
    assigneeUserId: number;
}