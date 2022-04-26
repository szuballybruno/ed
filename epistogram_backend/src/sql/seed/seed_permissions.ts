import { Permission } from '../../models/entity/authorization/Permission';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const permissionList = getSeedList<Permission>()({
    canChangeCourseMode: {
        code: 'canChangeCourseMode'
    },
    canSetInvitedUserCompany: {
        code: 'canSetInvitedUserCompany'
    },
    canAccessCourseAdministration: {
        code: 'canAccessCourseAdministration'
    },
    canAccessAdministration: {
        code: 'canAccessAdministration'
    },
    canAccessApplication: {
        code: 'canAccessApplication'
    },
    canAccessShopAdministration: {
        code: 'canAccessShopAdministration'
    },
    VIEW_COMPANY_ROLES: {
        code: 'VIEW_COMPANY_ROLES'
    },
    ASSIGN_COMPANY_ROLES: {
        code: 'ASSIGN_COMPANY_ROLES'
    },
    DELETE_COMPANY_ROLES: {
        code: 'DELETE_COMPANY_ROLES'
    },
    ASSIGN_GLOBAL_ROLES: {
        code: 'ASSIGN_GLOBAL_ROLES'
    },
    VIEW_COMPANY_COURSES: {
        code: 'VIEW_COMPANY_COURSES'
    },
    MANAGE_COMPANY: {
        code: 'MANAGE_COMPANY'
    }
});