import { Id } from "../../types/versionId";

export class RoleEditDTO {
    roleId: Id<'Role'>;
    name: string;
    permissionIds: Id<'Permission'>[];
    companyId: Id<'Company'> | null;
    isCustom: boolean;
}