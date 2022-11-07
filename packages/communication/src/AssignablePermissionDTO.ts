import { PermissionCodeType } from '../types/sharedTypes';
import { Id } from '@episto/commontypes';

export class AssignablePermissionDTO {
    userId: Id<'User'>;
    contextCompanyId: Id<'Company'>;
    permissionId: Id<'Permission'>;
    permissionCode: PermissionCodeType;
}