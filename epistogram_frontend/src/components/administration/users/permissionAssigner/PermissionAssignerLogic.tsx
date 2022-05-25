import { UserRoleDTO } from '../../../../shared/dtos/role/UserRoleDTO';

export const userRoleEquals = (a: UserRoleDTO, b: UserRoleDTO) => a.roleId === b.roleId
    && a.contextCompanyId === b.contextCompanyId;

export type DialogType = 'perm' | 'role';