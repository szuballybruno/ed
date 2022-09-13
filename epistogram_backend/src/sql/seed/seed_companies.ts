import { Company } from '../../models/entity/misc/Company';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getCompaniesSeedData = () => getSeedList<Company>()({
    Henkel: {
        deletionDate: null,
        name: 'Henkel',
        legalName: 'Henkel Kft.',
        primaryColor: null,
        secondaryColor: null,
        backdropColor: null,
        coverFileId: null,
        logoFileId: null,
        isCustomDomainCompany: true,
        domain: 'henkel.epistogram.com'
    },
    EpistoGram: {
        deletionDate: null,
        name: 'EpistoGram',
        legalName: 'EpistoGram Kft.',
        primaryColor: null,
        secondaryColor: null,
        backdropColor: null,
        coverFileId: null,
        logoFileId: null,
        isCustomDomainCompany: true,
        domain: 'epistogram.com'
    }
});

export type CompaniesSeedDataType = ReturnType<typeof getCompaniesSeedData>;