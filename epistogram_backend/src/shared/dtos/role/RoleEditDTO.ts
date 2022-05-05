export class RoleEditDTO {
    roleId: number;
    name: string;
    permissionIds: number[];
    ownerCompanyId: number | null;
    isGlobal: boolean;
}