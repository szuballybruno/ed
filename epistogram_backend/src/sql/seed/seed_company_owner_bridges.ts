import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { UserSeedDataType } from './seed_users';

export const getCompanyOwnerBridgeSeedData = (
    users: UserSeedDataType,
    companies: CompaniesSeedDataType) => getSeedList<CompanyOwnerBridge>()({
    PCWorld: {
        companyId: companies.PCWorld.id,
        userId: users.tomStrand.id
    },
    EpistoGram: {
        companyId: companies.EpistoGram.id,
        userId: users.marosiEndre.id
    }
});

export type CompanyOwnerBridgeSeedData = ReturnType<typeof getCompanyOwnerBridgeSeedData>;