export type CreateInvitedUserDTO = {
    firstName: string;
    lastName: string;
    email: string;
    organizationId?: number;
    roleId: number;
    jobTitle: string;
}