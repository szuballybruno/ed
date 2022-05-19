import { PermissionListDTO } from './PermissionListDTO';

export class RoleAdminListDTO {
    roleId: number;
    roleName: string;
    ownerName: string;
    companyId: number;
    companyName: string;
    permissions: PermissionListDTO[];
}