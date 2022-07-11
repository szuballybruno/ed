import { PermissionCodeType } from '../../types/sharedTypes';
import { Id } from '../../types/versionId';

export class UserPermissionDTO {
    permissionAssignmentBridgeId: Id<'RoleAssignmentBridge'> | null;
    permissionId: Id<'Permission'>;
    permissionCode: PermissionCodeType;
    assigneeUserId: Id<'User'>;
    contextCompanyId: Id<'Company'> | null;
    contextCompanyName: string | null;
    contextCourseId: Id<'Course'> | null;
    contextCourseName: string | null;
    parentRoleId: Id<'Role'> | null;
    parentRoleName: string | null;
}