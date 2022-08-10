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

        billMurry_access_app_perm: {
            permissionId: permissionList.ACCESS_APPLICATION.id,
            assigneeCompanyId: null,
            assigneeUserId: users.billMurry.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: null,
        },
        tomStrand_access_app: {
            permissionId: permissionList.ACCESS_APPLICATION.id,
            assigneeCompanyId: null,
            assigneeUserId: users.tomStrand.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: null
        },
        lizBlue_access_app: {
            permissionId: permissionList.ACCESS_APPLICATION.id,
            assigneeCompanyId: null,
            assigneeUserId: users.lizBlue.id,
            assigneeGroupId: null,
            contextCompanyId: null,
            contextCourseId: null
        }
    });

export type PermissionAssignmentBridgeSeedDataType = ReturnType<typeof getPermissionAssignmentBridgeSeedData>;