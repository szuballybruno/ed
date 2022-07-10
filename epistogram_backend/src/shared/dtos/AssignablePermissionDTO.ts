import { Permission } from '../../models/entity/authorization/Permission';
import { Company } from '../../models/entity/Company';
import { User } from '../../models/entity/User';
import { PermissionCodeType } from '../types/sharedTypes';
import { Id } from '../types/versionId';

export class AssignablePermissionDTO {
    userId: Id<User>;
    contextCompanyId: Id<Company>;
    permissionId: Id<Permission>;
    permissionCode: PermissionCodeType;
}