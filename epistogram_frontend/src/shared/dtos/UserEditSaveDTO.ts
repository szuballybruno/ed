import { Id } from '../types/versionId';

export class UserEditSaveDTO {
    userId: Id<'User'>;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: Id<'Company'>;
    departmentId: Id<'Department'> | null;
    assignedRoleIds: Id<'Role'>[];
}