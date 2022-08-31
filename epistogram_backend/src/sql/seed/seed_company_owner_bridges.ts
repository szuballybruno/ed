import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { UserSeedDataType } from './seed_users';

export const getCompanyOwnerBridgeSeedData = (
    users: UserSeedDataType,
    companies: CompaniesSeedDataType) => getSeedList<CompanyOwnerBridge>()({
    Henkel: {
        companyId: companies.Henkel.id,
        userId: users.tomStrand.id
    },
    EpistoGram: {
        companyId: companies.EpistoGram.id,
        userId: users.marosiEndre.id
    }
});

export type CompanyOwnerBridgeSeedData = ReturnType<typeof getCompanyOwnerBridgeSeedData>;