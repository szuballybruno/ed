import { ViewColumn, ViewEntity } from 'typeorm';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

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
    contextCompanyName: string;

    @ViewColumn()
    ownerCompanyId: number | null;

    @ViewColumn()
    ownerCompanyName: string | null;

    @ViewColumn()
    isCustom: boolean;

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

    @ViewColumn()
    permissionCode: PermissionCodeType;
}
