import { Id } from '../types/versionId';

export type CreateInvitedUserDTO = {
    firstName: string;
    lastName: string;
    email: string;
    companyId?: Id<'Company'>;
    roleId: Id<'Role'>;
    departmentId: Id<'Department'>;
}