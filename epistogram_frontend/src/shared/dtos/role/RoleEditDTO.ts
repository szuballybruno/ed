
export class RoleEditDTO {
    roleId: number;
    name: string;
    permissionIds: number[];
    companyId: number | null;
}