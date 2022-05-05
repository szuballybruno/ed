import { PermissionCodeType } from '../../types/sharedTypes';

export class PermissionListDTO {
    id: number;
    code: PermissionCodeType;
    isGlobal: boolean;
}