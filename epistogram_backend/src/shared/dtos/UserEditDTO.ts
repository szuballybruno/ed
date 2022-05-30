import { ChangeSet } from './changeSet/ChangeSet';
import { UserPermissionDTO } from './role/UserPermissionDTO';
import { UserRoleDTO } from './role/UserRoleDTO';

export class UserEditDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: number;
    jobTitleId: number | null;
    roles: ChangeSet<UserRoleDTO>;
    permissions: ChangeSet<UserPermissionDTO>;
}