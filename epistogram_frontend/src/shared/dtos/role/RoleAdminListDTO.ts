import { RoleScopeType } from '../../types/sharedTypes';
import { PermissionListDTO } from './PermissionListDTO';

export class RoleAdminListDTO {
    roleId: number;
    roleName: string;
    roleScope: RoleScopeType;
    ownerType: 'user' | 'company' | 'group';
    ownerName: string;
    companyId: number;
    companyName: string;
    permissions: PermissionListDTO[];
}