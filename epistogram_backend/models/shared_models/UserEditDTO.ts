import { JobTitleDTO } from "./JobTitleDTO";
import { OrganizationDTO } from "./OrganizationDTO";
import { RoleDTO } from "./RoleDTO";

export type UserEditDTO = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    organization: OrganizationDTO | null;
    role: RoleDTO | null;
    jobTitle: JobTitleDTO | null;
}