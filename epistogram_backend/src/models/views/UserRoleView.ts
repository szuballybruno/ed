import { ViewColumn, ViewEntity } from 'typeorm';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

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
    assigneeUserId: number;

    @ViewColumn()
    isInherited: boolean;

    @ViewColumn()
    permissionId: number;
    
    @ViewColumn()
    permissionCode: PermissionCodeType;
}