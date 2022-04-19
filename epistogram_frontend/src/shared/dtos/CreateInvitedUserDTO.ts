export type CreateInvitedUserDTO = {
    firstName: string;
    lastName: string;
    email: string;
    companyId?: number;
    roleId: number;
    jobTitleId: number;
}