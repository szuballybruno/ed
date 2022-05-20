import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { RolesSeedDataType } from './seed_roles';
import { UserSeedDataType } from './seed_users';

export const getRoleAssignmentBridgeSeedData = (
    companies: CompaniesSeedDataType,
    roles: RolesSeedDataType,
    users: UserSeedDataType
) => getSeedList<RoleAssignmentBridge>()({
    pcworld_company_user_role: {
        roleId: roles.Company_User.id,
        assigneeCompanyId: companies.PCWorld.id,
        assigneeUserId: null,
        contextCompanyId: companies.PCWorld.id,
    },
    henkel_company_user_role: {
        roleId: roles.Company_User.id,
        assigneeCompanyId: companies.Henkel.id,
        assigneeUserId: null,
        contextCompanyId: companies.Henkel.id,
    },

    almostgod_a: {
        roleId: roles.Company_Owner.id,
        assigneeCompanyId: null,
        assigneeUserId: users.user_2.id,
        contextCompanyId: companies.EpistoGram.id,
    }
});

export type RoleAssignmentBridgeSeedDataType = ReturnType<typeof getRoleAssignmentBridgeSeedData>; 