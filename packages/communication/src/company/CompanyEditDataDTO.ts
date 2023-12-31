import { Id } from '@episto/commontypes';

export class CompanyEditDataDTO {
    id: Id<'Company'>;
    name: string;
    legalName: string | null;
    domain: string;
    primaryColor: string | null;
    secondaryColor: string | null;
    backdropColor: string | null;
    isCustomDomainCompany: boolean;
    logoUrl: string | null;
    coverUrl: string | null;
}