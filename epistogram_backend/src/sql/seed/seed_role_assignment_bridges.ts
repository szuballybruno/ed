import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import { roleList } from './seed_roles';

export const roleAssignmentBridgeSeedList = getSeedList<RoleAssignmentBridge>()({
    pcworld_company_user_role: {
        contextCompanyId: seed_companies.PCWorld.id,
        roleId: roleList.Company_User.id,
        companyId: seed_companies.PCWorld.id,
        userId: null
    },
    henkel_company_user_role: {
        contextCompanyId: seed_companies.Henkel.id,
        roleId: roleList.Company_User.id,
        companyId: seed_companies.Henkel.id,
        userId: null
    },

    almostgod_a: {
        contextCompanyId: seed_companies.EpistoGram.id,
        roleId: roleList.Company_Owner.id,
        companyId: null,
        userId: 2
    }
});