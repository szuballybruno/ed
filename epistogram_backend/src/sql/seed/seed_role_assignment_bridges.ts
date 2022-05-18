import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import { roleList } from './seed_roles';
import seed_users from './seed_users';

export const roleAssignmentBridgeSeedList = getSeedList<RoleAssignmentBridge>()({
    pcworld_company_user_role: {
        roleId: roleList.Company_User.id,
        assigneeCompanyId: seed_companies.PCWorld.id,
        assigneeUserId: null,
        contextCompanyId: seed_companies.PCWorld.id,
    },
    henkel_company_user_role: {
        roleId: roleList.Company_User.id,
        assigneeCompanyId: seed_companies.Henkel.id,
        assigneeUserId: null,
        contextCompanyId: seed_companies.Henkel.id,
    },

    almostgod_a: {
        roleId: roleList.Company_Owner.id,
        assigneeCompanyId: null,
        assigneeUserId: seed_users.user_2.id,
        contextCompanyId: seed_companies.EpistoGram.id,
    }
});