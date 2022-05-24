 
export class UserPermissionDTO {
    permissionAssignmentBridgeId: number | null;
    permissionId: number;
    permissionName: string;
    assigneeUserId: number;
    contextCompanyId: number | null;
    contextCompanyName: string | null;
    contextCourseId: number | null;
    contextCourseName: string | null;
}