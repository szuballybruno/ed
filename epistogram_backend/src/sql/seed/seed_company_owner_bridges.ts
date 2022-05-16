import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';

const list = getSeedList<CompanyOwnerBridge>()({
    PCWorld: {
        companyId: seed_companies.PCWorld.id,
        userId: 1
    },
    EpistoGram: {
        companyId: seed_companies.EpistoGram.id,
        userId: 4
    },
    Manni_BT: {
        companyId: seed_companies.Manni_BT.id,
        userId: 5
    },
    Henkel: {
        companyId: seed_companies.Henkel.id,
        userId: 5
    }
});

export default list;