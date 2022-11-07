import { Id } from '@episto/commontypes';

export class UserEditSaveDTO {
    userId: Id<'User'>;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    isSurveyRequired: boolean;
    companyId: Id<'Company'>;
    departmentId: Id<'Department'>;
    assignedRoleIds: Id<'Role'>[];
}