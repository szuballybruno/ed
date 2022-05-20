import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { UserSeedDataType } from './seed_users';

export const getCompanyOwnerBridgeSeedData = (
    users: UserSeedDataType,
    companies: CompaniesSeedDataType) => getSeedList<CompanyOwnerBridge>()({
    PCWorld: {
        companyId: companies.PCWorld.id,
        userId: users.god.id
    },
    EpistoGram: {
        companyId: companies.EpistoGram.id,
        userId: users.user_4.id
    },
    Manni_BT: {
        companyId: companies.Manni_BT.id,
        userId: users.user_5.id
    },
    Henkel: {
        companyId: companies.Henkel.id,
        userId: users.user_5.id
    }
});

export type CompanyOwnerBridgeSeedData = ReturnType<typeof getCompanyOwnerBridgeSeedData>;