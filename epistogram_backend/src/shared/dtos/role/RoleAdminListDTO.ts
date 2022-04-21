export class RoleAdminListDTO {
    name: string;
    ownerType: 'user' | 'company' | 'group';
    ownerLabel: string;
}