import { JobTitleDTO } from "./JobTitleDTO";
import { OrganizationDTO } from "./OrganizationDTO";
import { RoleDTO } from "./RoleDTO";

export class UserEditDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    organization: OrganizationDTO | null;
    role: RoleDTO | null;
    jobTitle: JobTitleDTO | null;
}