import { UserRoleDTO } from './role/UserRoleDTO';

export class UserEditDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: number;
    jobTitleId: number | null;
    assignedRoles: UserRoleDTO[];
    assignedPermissions: any[];
}