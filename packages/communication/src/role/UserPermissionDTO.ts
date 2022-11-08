import { Id, PermissionCodeType } from '@episto/commontypes';

export class UserPermissionDTO {
    permissionAssignmentBridgeId: Id<'PermissionAssignmentBridge'> | null;
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