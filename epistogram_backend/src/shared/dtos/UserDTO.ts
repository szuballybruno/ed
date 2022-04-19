import { JobTitleDTO } from './JobTitleDTO';
import { UserActivityDTO } from './UserActivityDTO';

export class UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    companyId: number;
    isTrusted: boolean;
    email: string;
    phoneNumber: string;
    name: string;
    isInvitationAccepted: boolean;
    avatarUrl: string | null;
    jobTitle: JobTitleDTO | null;
    userActivity: UserActivityDTO;
}