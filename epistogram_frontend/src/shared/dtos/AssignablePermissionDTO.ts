import { PermissionCodeType } from '../types/sharedTypes';

export class AssignablePermissionDTO {
    userId: number;
    contextCompanyId: number;
    permissionId: number;
    permissionCode: PermissionCodeType;
}