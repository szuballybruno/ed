import { Id } from "../../types/versionId";

export class CompanyEditDataDTO {
    id: Id<'Company'>;
    name: string;
}