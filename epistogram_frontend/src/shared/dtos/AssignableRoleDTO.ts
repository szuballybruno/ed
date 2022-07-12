import { Id } from '../types/versionId';
import { PermissionListDTO } from './role/PermissionListDTO';

export class AssignableRoleDTO {
    roleId: Id<'Role'>;
    roleName: string;
    contextCompanyName: string;
    ownerCompanyId: Id<'Company'> | null;
    ownerCompanyName: string | null;
    isCustom: boolean;
    isAssigned: boolean;
    canAssign: boolean;
    permissions: PermissionListDTO[];
}