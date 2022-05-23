
export class AssignableRoleDTO {
    roleId: number;
    roleName: string;
    contextCompanyName: string;
    ownerCompanyId: number | null;
    ownerCompanyName: string | null;
    isCustom: boolean;
    isAssigned: boolean;
    canAssign: boolean;
    permissionIds: number[];
}