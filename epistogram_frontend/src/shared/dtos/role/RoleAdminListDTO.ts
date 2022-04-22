export class RoleAdminListDTO {
    roleName: string;
    ownerType: 'user' | 'company' | 'group';
    ownerName: string;
}