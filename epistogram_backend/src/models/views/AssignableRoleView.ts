import { ViewColumn, ViewEntity } from 'typeorm';
import { RoleScopeType } from '../../shared/types/sharedTypes';

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
    roleScope: RoleScopeType;

    @ViewColumn()
    isAssigned: boolean;

    @ViewColumn()
    canAssign: boolean;

    @ViewColumn()
    permissionId: number;
}
