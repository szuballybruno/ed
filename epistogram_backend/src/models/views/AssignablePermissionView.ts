import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignablePermissionView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    permissionId: number;

    @ViewColumn()
    permissionCode: string;
}
