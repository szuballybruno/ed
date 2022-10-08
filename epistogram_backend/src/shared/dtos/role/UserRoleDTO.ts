import { Id } from '../../types/versionId';
import { PermissionListDTO } from './PermissionListDTO';

export class UserRoleDTO {
    roleId: Id<'Role'>;
    roleName: string;
    isInherited: boolean;
    permissions: PermissionListDTO[];
}