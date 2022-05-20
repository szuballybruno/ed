import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';

export const getCompanyOwnerBridgeSeedData = (companies: CompaniesSeedDataType) => getSeedList<CompanyOwnerBridge>()({
    PCWorld: {
        companyId: companies.PCWorld.id,
        userId: 1
    },
    EpistoGram: {
        companyId: companies.EpistoGram.id,
        userId: 4
    },
    Manni_BT: {
        companyId: companies.Manni_BT.id,
        userId: 5
    },
    Henkel: {
        companyId: companies.Henkel.id,
        userId: 5
    }
});

export type CompanyOwnerBridgeSeedData = ReturnType<typeof getCompanyOwnerBridgeSeedData>;