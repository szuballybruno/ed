import { Company } from "../../../models/entity/Company";
import { Id } from "../../types/versionId";

export class RoleAssignCompanyDTO {
    id: Id<'Company'>;
    name: string;
    canAssignRole: boolean;
}