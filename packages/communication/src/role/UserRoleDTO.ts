import { Id } from '@episto/commontypes';
import { PermissionListDTO } from './PermissionListDTO';

export class UserRoleDTO {
    roleId: Id<'Role'>;
    roleName: string;
    isInherited: boolean;
    permissions: PermissionListDTO[];
}