import { Id } from '../types/versionId';

export type CreateInvitedUserDTO = {
    firstName: string;
    lastName: string;
    email: string;
    companyId: Id<'Company'>;
    departmentId: Id<'Department'>;
}