import { PermissionCodeType } from '../types/sharedTypes';
import { UserDTO } from './UserDTO';

export class AuthDataDTO {
    currentUser: UserDTO;
    permissions: PermissionCodeType[];
}