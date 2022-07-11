import { Permission } from "../../../models/entity/authorization/Permission";
import { Role } from "../../../models/entity/authorization/Role";
import { Company } from "../../../models/entity/Company";
import { Id } from "../../types/versionId";

export class RoleEditDTO {
    roleId: Id<'Role'>;
    name: string;
    permissionIds: Id<'Permission'>[];
    companyId: Id<'Company'> | null;
    isCustom: boolean;
}