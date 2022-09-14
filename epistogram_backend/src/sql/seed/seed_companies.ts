import { Company } from '../../models/entity/misc/Company';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { StorageFileSeedDataType } from './seed_storage_file';

export const getCompaniesSeedData = (storageFile: StorageFileSeedDataType) => getSeedList<Company>()({
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
        primaryColor: 'rgb(151, 201, 204)',
        secondaryColor: 'rgb(77,105,127)',
        backdropColor: 'rgb(151, 201, 204)',
        coverFileId: storageFile.storage_file_company_cover_epistogram.id,
        logoFileId: storageFile.storage_file_company_logo_epistogram.id,
        isCustomDomainCompany: true,
        domain: 'epistogram.com'
    }
});

export type CompaniesSeedDataType = ReturnType<typeof getCompaniesSeedData>;