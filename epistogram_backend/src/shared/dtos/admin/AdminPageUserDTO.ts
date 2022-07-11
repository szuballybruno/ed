import { Role } from "../../../models/entity/authorization/Role";
import { Company } from "../../../models/entity/Company";
import { JobTitle } from "../../../models/entity/JobTitle";
import { User } from "../../../models/entity/User";
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