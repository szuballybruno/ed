import { Role } from "../../models/entity/authorization/Role";
import { Company } from "../../models/entity/Company";
import { JobTitle } from "../../models/entity/JobTitle";
import { Id } from "../types/versionId";

export type CreateInvitedUserDTO = {
    firstName: string;
    lastName: string;
    email: string;
    companyId?: Id<Company>;
    roleId: Id<Role>;
    jobTitleId: Id<JobTitle>;
}