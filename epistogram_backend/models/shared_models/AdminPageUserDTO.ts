import { JobTitleDTO } from "./JobTitleDTO";
import { TaskDTO } from "./TaskDTO";
import { UserActivityDTO } from "./UserActivityDTO";

export class AdminPageUserDTO {
    id: number;
    firstName: string;
    lastName: string;
    organizationId: number;
    isTrusted: boolean;
    email: string;
    phoneNumber: string;
    name: string;
    isInvitationAccepted: boolean;
    avatarUrl: string | null;
    jobTitle: JobTitleDTO | null;
    userActivity: UserActivityDTO;
    organizationName: string;
    tasks: TaskDTO[];
    roleId: number;
}