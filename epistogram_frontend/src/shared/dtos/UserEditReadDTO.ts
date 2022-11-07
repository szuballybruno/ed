import { Id } from '../types/versionId';

export class UserEditReadDTO {
    userId: Id<'User'> | null;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: Id<'Company'>;
    departmentId: Id<'Department'> | null;
    roleIds: Id<'Role'>[];
    isSurveyRequired: boolean;
}