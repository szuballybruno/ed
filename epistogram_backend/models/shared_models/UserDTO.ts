import { UserActivityDTO } from "./UserActivityDTO";

export type UserDTO = {
    id: number;
    firstName: string;
    lastName: string;
    organizationId: number;
    jobTitle: string;
    email: string;
    phoneNumber: string;
    name: string;
    isPendingInvitation: boolean;
    avatarUrl: string | null;
    userActivity: UserActivityDTO;
}