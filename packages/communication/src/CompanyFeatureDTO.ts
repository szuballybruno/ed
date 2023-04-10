import { Id } from "@episto/commontypes";

export class CompanyFeatureDTO {
    featureId: Id<'Feature'>;
    companyId?: Id<'Company'>;
    featureCode: string;
    featureDescription: string;
    isEnabled: boolean;
}