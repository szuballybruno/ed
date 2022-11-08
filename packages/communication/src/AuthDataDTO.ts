import { PermissionCodeType } from '@episto/commontypes';
import { UserDTO } from './UserDTO';

export class AuthDataDTO {
    currentUser: UserDTO;
    permissions: PermissionCodeType[];
}