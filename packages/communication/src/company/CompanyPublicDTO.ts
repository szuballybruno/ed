
export class CompanyPublicDTO {
    name: string;
    legalName: string | null;
    domain: string;
    primaryColor: string | null;
    secondaryColor: string | null;
    backdropColor: string | null;
    logoUrl: string | null;
    coverUrl: string | null;
    isSurveyRequired: boolean;
}