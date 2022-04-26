import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import { roleList } from './seed_roles';

export const roleAssignmentBridgeSeedList = getSeedList<RoleAssignmentBridge>()({
    company_1_company_user_role: {
        companyId: seed_companies.PCWorld.id,
        roleId: roleList.Company_User.id,
        userId: null
    },
    company_2_company_user_role: {
        companyId: seed_companies.EpistoGram.id,
        roleId: roleList.Company_User.id,
        userId: null
    },
    company_3_company_user_role: {
        companyId: seed_companies.Manni_BT.id,
        roleId: roleList.Company_User.id,
        userId: null
    },
    company_4_company_user_role: {
        companyId: seed_companies.Henkel.id,
        roleId: roleList.Company_User.id,
        userId: null
    },

    almostgod_a: {
        companyId: seed_companies.PCWorld.id,
        roleId: roleList.Company_Owner.id,
        userId: 2
    }
});