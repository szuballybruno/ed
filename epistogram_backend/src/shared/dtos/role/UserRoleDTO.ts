import { Id } from '../../types/versionId';
import { PermissionListDTO } from './PermissionListDTO';

export class UserRoleDTO {
    assignmentBridgeId: Id<'RoleAssignmentBridge'>;
    contextCompanyId: Id<'Company'>;
    contextCompanyName: string;
    roleId: Id<'Role'>;
    roleName: string;
    assigneeUserId: Id<'User'>;
    isInherited: boolean;
    permissions: PermissionListDTO[];
}