import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { CourseSeedDataType } from './seed_courses';
import { PermissionsSeedDataType } from './seed_permissions';
import { UserSeedDataType } from './seed_users';

export const getPermissionAssignmentBridgeSeedData = (
    companies: CompaniesSeedDataType,
    courses: CourseSeedDataType,
    permissionList: PermissionsSeedDataType,
    users: UserSeedDataType) => getSeedList<PermissionAssignmentBridge>()({

        manni_bt_user_2_manage_company_courses: {
            permissionId: permissionList.EDIT_COMPANY_COURSES.id,
            assigneeCompanyId: null,
            assigneeUserId: users.almostGod.id,
            assigneeGroupId: null,
            contextCompanyId: companies.Manni_BT.id,
            contextCourseId: null,
        },
        manni_bt_manni_bt_view_company_courses: {
            permissionId: permissionList.WATCH_COMPANY_COURSES.id,
            assigneeCompanyId: companies.Manni_BT.id,
            assigneeUserId: null,
            assigneeGroupId: null,
            contextCompanyId: companies.Manni_BT.id,
            contextCourseId: null,
        },
        user_2_access_app_perm: {
            permissionId: permissionList.ACCESS_APPLICATION.id,
            assigneeCompanyId: null,
            assigneeUserId: users.almostGod.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: null,
        },
        user_2_admin_access_perm: {
            permissionId: permissionList.ACCESS_ADMIN.id,
            assigneeCompanyId: null,
            assigneeUserId: users.almostGod.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: null,
        },
        user_2_set_course_mode_perm: {
            permissionId: permissionList.SET_COURSE_MODE.id,
            assigneeCompanyId: null,
            assigneeUserId: users.almostGod.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: courses.course_28.id,
        },
        user_2_watch_comp_course_perm: {
            permissionId: permissionList.WATCH_COMPANY_COURSES.id,
            assigneeCompanyId: null,
            assigneeUserId: users.almostGod.id,
            assigneeGroupId: null,
            contextCompanyId: companies.EpistoGram.id,
            contextCourseId: null,
        },
        user_2_watch_course_perm: {
            permissionId: permissionList.WATCH_COURSE.id,
            assigneeCompanyId: null,
            assigneeUserId: users.almostGod.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: courses.course_28.id,
        },
        kovkrisz_access_app: {
            permissionId: permissionList.ACCESS_APPLICATION.id,
            assigneeCompanyId: null,
            assigneeUserId: users.user_kovacskrisz.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: null
        }
    });

export type PermissionAssignmentBridgeSeedDataType = ReturnType<typeof getPermissionAssignmentBridgeSeedData>;