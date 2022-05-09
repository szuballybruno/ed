import { RoleScopeType } from '../../types/sharedTypes';

export class RoleEditDTO {
    roleId: number;
    name: string;
    permissionIds: number[];
    companyId: number | null;
    scope: RoleScopeType;
}