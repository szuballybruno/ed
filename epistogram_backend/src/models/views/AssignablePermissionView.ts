import { ViewColumn, ViewEntity } from 'typeorm';
import { PermissionCodeType, PermissionScopeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignablePermissionView {

    @ViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    permissionId: number;

    @ViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    permissionScope: PermissionScopeType;
}
