import { PermissionListDTO } from './PermissionListDTO';

export class RoleAdminListDTO {
    roleName: string;
    ownerType: 'user' | 'company' | 'group';
    ownerName: string;
    companyId: number;
    companyName: string;
    permissions: PermissionListDTO[];
}