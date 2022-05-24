import { PermissionCodeType } from '../../types/sharedTypes';

export class UserPermissionDTO {
    permissionAssignmentBridgeId: number | null;
    permissionId: number;
    permissionCode: PermissionCodeType;
    assigneeUserId: number;
    contextCompanyId: number | null;
    contextCompanyName: string | null;
    contextCourseId: number | null;
    contextCourseName: string | null;
    parentRoleId: number | null;
    parentRoleName: string | null;
}