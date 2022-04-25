export class RoleAdminListDTO {
    roleName: string;
    ownerType: 'user' | 'company' | 'group';
    ownerName: string;
    isGlobal: boolean;
    companyId: number;
    companyName: string;
}