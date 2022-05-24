
export class UserRoleDTO {
    roleAssignmentBridgeId: number;
    contextCompanyId: number;
    contextCompanyName: string;
    roleId: number;
    roleName: string;
    ownerCompanyId: number | null;
    ownerCompanyName: string | null;
    assigneeUserId: number;
}