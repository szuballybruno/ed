import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import { permissionList } from './seed_permissions';

export const list = getSeedList<PermissionAssignmentBridge>()({
    manni_bt_user_2_manage_company_courses: {
        permissionId: permissionList.EDIT_COMPANY_COURSES.id,
        assigneeCompanyId: null,
        assigneeUserId: 2,
        assigneeGroupId: null,
        contextCompanyId: seed_companies.Manni_BT.id,
        contextCourseId: null,
    },
    manni_bt_manni_bt_view_company_courses: {
        permissionId: permissionList.WATCH_COMPANY_COURSES.id,
        assigneeCompanyId: seed_companies.Manni_BT.id,
        assigneeUserId: null,
        assigneeGroupId: null,
        contextCompanyId: seed_companies.Manni_BT.id,
        contextCourseId: null,
    },
    user_2_access_app_perm: {
        permissionId: permissionList.ACCESS_APPLICATION.id,
        assigneeCompanyId: null,
        assigneeUserId: 2,
        assigneeGroupId: null,
        contextCompanyId: null,
        contextCourseId: null,
    },
    user_2_admin_access_perm: {
        permissionId: permissionList.ACCESS_ADMIN.id,
        assigneeCompanyId: null,
        assigneeUserId: 2,
        assigneeGroupId: null,
        contextCompanyId: null,
        contextCourseId: null,
    },
    user_2_set_course_mode_perm: {
        permissionId: permissionList.SET_COURSE_MODE.id,
        assigneeCompanyId: null,
        assigneeUserId: 2,
        assigneeGroupId: null,
        contextCompanyId: null,
        contextCourseId: 28,
    },
    user_2_watch_comp_course_perm: {
        permissionId: permissionList.WATCH_COMPANY_COURSES.id,
        assigneeCompanyId: null,
        assigneeUserId: 2,
        assigneeGroupId: null,
        contextCompanyId: 1,
        contextCourseId: null,
    },
    user_2_watch_course_perm: {
        permissionId: permissionList.WATCH_COURSE.id,
        assigneeCompanyId: null,
        assigneeUserId: 2,
        assigneeGroupId: null,
        contextCompanyId: null,
        contextCourseId: 28,
    }
});

export default list;