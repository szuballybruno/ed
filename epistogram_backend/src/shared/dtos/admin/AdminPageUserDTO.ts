
export class AdminPageUserDTO {
    id: number;
    isTrusted: boolean;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    canAccessApplication: boolean;
    isInvitationAccepted: boolean;
    avatarUrl: string | null;
    jobTitleId: number;
    jobTitleName: string;
    companyId: number;
    companyName: string;
    roleId: number;
    latestActivityDate: Date;
    totalSpentTimeSeconds: number;
    coinBalance: number;
}