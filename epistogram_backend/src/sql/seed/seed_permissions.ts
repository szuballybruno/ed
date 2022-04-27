import { Permission } from '../../models/entity/authorization/Permission';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const permissionList = getSeedList<Permission>()({
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
    },

    // global permissions
    MANAGE_COMPANY_COURSES: {
        code: 'MANAGE_COMPANY_COURSES'
    },
    ACCESS_ADMIN: {
        code: 'ACCESS_ADMIN'
    },
    ACCESS_APPLICATION: {
        code: 'ACCESS_APPLICATION'
    },
    MANAGE_SHOP: {
        code: 'MANAGE_SHOP'
    },
    DELETE_COMPANY: {
        code: 'DELETE_COMPANY'
    },
    CREATE_COMPANY: {
        code: 'CREATE_COMPANY'
    }
});