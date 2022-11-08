import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';

export class AssignablePermissionDTO {
    userId: Id<'User'>;
    contextCompanyId: Id<'Company'>;
    permissionId: Id<'Permission'>;
    permissionCode: PermissionCodeType;
}