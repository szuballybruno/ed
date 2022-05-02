import { PermissionListDTO } from './PermissionListDTO';

export class RoleAdminListDTO {
    roleId: number;
    roleName: string;
    ownerType: 'user' | 'company' | 'group';
    ownerName: string;
    companyId: number;
    companyName: string;
    permissions: PermissionListDTO[];
}