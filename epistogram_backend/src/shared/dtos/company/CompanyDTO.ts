import { Company } from "../../../models/entity/Company";
import { Id } from "../../types/versionId";

export class CompanyDTO {
    id: Id<'Company'>;
    name: string;
}