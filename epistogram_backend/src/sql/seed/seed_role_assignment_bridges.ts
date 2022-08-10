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

    episto_company_user_role: {
        roleId: roles.Company_User.id,
        assigneeCompanyId: companies.EpistoGram.id,
        assigneeUserId: null,
        contextCompanyId: companies.EpistoGram.id,
    }
});

export type RoleAssignmentBridgeSeedDataType = ReturnType<typeof getRoleAssignmentBridgeSeedData>; 