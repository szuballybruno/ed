import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import { permissionList } from './seed_permissions';

export const list = getSeedList<PermissionAssignmentBridge>()({
    manni_bt_user_2_manage_company_courses: {
        companyId: null,
        contextCompanyId: seed_companies.Manni_BT.id,
        permissionId: permissionList.MANAGE_COMPANY_COURSES.id,
        userId: 2
    },
    manni_bt_manni_bt_view_company_courses: {
        companyId: seed_companies.Manni_BT.id,
        contextCompanyId: seed_companies.Manni_BT.id,
        permissionId: permissionList.VIEW_COMPANY_COURSES.id,
        userId: null
    }
});

export default list;