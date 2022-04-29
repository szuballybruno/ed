export class RoleAdminListDTO {
    roleName: string;
    ownerType: 'user' | 'company' | 'group';
    ownerName: string;
    companyId: number;
    companyName: string;
}