import { Company } from '../../models/entity/Company';
import { User } from '../../models/entity/User';
import { Id } from '../types/versionId';
import { JobTitleDTO } from './JobTitleDTO';

export class UserDTO {
    id: Id<'User'>;
    firstName: string;
    lastName: string;
    companyId: Id<'Company'>;
    isTrusted: boolean;
    email: string;
    phoneNumber: string;
    name: string;
    isInvitationAccepted: boolean;
    avatarUrl: string | null;
    jobTitle: JobTitleDTO | null;
}