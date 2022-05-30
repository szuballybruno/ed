import { PermissionListDTO } from './PermissionListDTO';

export class UserRoleDTO {
    assignmentBridgeId: number;
    contextCompanyId: number;
    contextCompanyName: string;
    roleId: number;
    roleName: string;
    assigneeUserId: number;
    isInherited: boolean;
    permissions: PermissionListDTO[];
}