import { Id } from '../../types/versionId';
import { PermissionListDTO } from './PermissionListDTO';

export class RoleAdminListDTO {
    roleId: Id<'Role'>;
    roleName: string;
    ownerName: string;
    companyId: Id<'Company'>;
    companyName: string;
    permissions: PermissionListDTO[];
}