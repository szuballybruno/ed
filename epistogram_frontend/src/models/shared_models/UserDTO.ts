import { UserRightsDTO } from "./UserRightsDTO";

export type UserDTO = {
    id: number;
    firstName: string;
    lastName: string;
    organizationId: number;
    jobTitle: string;
    isActive: boolean;
    email: string;
    phoneNumber: string;
    name: string;
    avatarUrl: string | null;
    userRights: UserRightsDTO;
}