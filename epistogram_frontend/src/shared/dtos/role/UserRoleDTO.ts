import { PermissionListDTO } from './PermissionListDTO';

export class UserRoleDTO {
    roleAssignmentBridgeId: number;
    contextCompanyId: number;
    contextCompanyName: string;
    roleId: number;
    roleName: string;
    assigneeUserId: number;
    isInherited: boolean;
    permissions: PermissionListDTO[];
}