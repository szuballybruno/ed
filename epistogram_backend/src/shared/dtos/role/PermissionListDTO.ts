import { PermissionCodeType, PermissionScopeType } from '../../types/sharedTypes';
import { Id } from '../../types/versionId';

export class PermissionListDTO {
    id: Id<'Permission'>;
    code: PermissionCodeType;
    scope: PermissionScopeType;
}