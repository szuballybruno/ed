import { Company } from '../../models/entity/Company';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getCompaniesSeedData = () => getSeedList<Company>()({
    Henkel: {
        deletionDate: null,
        name: 'Henkel',
        domain: 'henkel.epistogram.com'
    },
    EpistoGram: {
        deletionDate: null,
        name: 'EpistoGram',
        domain: 'epistogram.epistogram.com'
    }
});

export type CompaniesSeedDataType = ReturnType<typeof getCompaniesSeedData>;