import { Company } from '../../models/entity/Company';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getCompaniesSeedData = () => getSeedList<Company>()({
    PCWorld: {
        deletionDate: null,
        name: 'PCWorld'
    },
    EpistoGram: {
        deletionDate: null,
        name: 'EpistoGram'
    }
});

export type CompaniesSeedDataType = ReturnType<typeof getCompaniesSeedData>;