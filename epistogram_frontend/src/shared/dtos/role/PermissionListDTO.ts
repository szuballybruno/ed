import { PermissionCodeType, PermissionScopeType } from '../../types/sharedTypes';

export class PermissionListDTO {
    id: number;
    code: PermissionCodeType;
    scope: PermissionScopeType;
}