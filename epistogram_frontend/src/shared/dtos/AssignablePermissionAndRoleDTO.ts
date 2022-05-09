
export class AssignablePermissionAndRoleDTO {
    userId: number;
    contextCompanyId: number;
    permissionId: number | null;
    permissionCode: string | null;
    roleId: number | null;
    roleName: string | null;
    isRole: boolean;
}