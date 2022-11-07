import { Id } from '@episto/commontypes';

export class RoleEditDTO {
    roleId: Id<'Role'>;
    name: string;
    permissionIds: Id<'Permission'>[];
    companyId: Id<'Company'> | null;
    isCustom: boolean;
}