import { Id } from '../types/versionId';
import { UserRoleDTO } from './role/UserRoleDTO';

export class UserEditReadDTO {
    userId: Id<'User'>;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: Id<'Company'>;
    departmentId: Id<'Department'> | null;
    roles: UserRoleDTO[];
}