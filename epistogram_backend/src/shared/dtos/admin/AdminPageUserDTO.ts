import { Id } from "../../types/versionId";

export class AdminPageUserDTO {
    id: Id<'User'>;
    isTrusted: boolean;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    canAccessApplication: boolean;
    isInvitationAccepted: boolean;
    avatarUrl: string | null;
    jobTitleId: Id<'JobTitle'>;
    jobTitleName: string;
    companyId: Id<'Company'>;
    companyName: string;
    roleId: Id<'Role'>;
    latestActivityDate: Date;
    totalSpentTimeSeconds: number;
    coinBalance: number;
}