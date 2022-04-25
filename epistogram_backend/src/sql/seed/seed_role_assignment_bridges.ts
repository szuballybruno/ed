import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { roleList } from './seed_roles';
import { getSeedList } from './seed_test';

export const roleAssignmentBridgeSeedList = getSeedList<RoleAssignmentBridge>()({
    company_1_company_user_role: {
        companyId: 1,
        roleId: roleList.Company_User.id,
    }
});