import { Permission } from '../../models/entity/authorization/Permission';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const permissionList = getSeedList<Permission>()({

    // roles
    VIEW_COMPANY_ROLES: {
        code: 'VIEW_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    EDIT_COMPANY_ROLES: {
        code: 'EDIT_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    DELETE_COMPANY_ROLES: {
        code: 'DELETE_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    EDIT_GLOBAL_ROLES: {
        code: 'EDIT_GLOBAL_ROLES',
        scope: 'GLOBAL'
    },
    VIEW_GLOBAL_ROLES: {
        code: 'VIEW_GLOBAL_ROLES',
        scope: 'GLOBAL'
    },
    ASSIGN_COMPANY_ROLES: {
        code: 'ASSIGN_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    ASSIGN_GLOBAL_ROLES: {
        code: 'ASSIGN_GLOBAL_ROLES',
        scope: 'COMPANY'
    },

    // permissions 
    ASSIGN_COMPANY_PERMISSIONS: {
        code: 'ASSIGN_COMPANY_PERMISSIONS',
        scope: 'COMPANY'
    },
    ASSIGN_GLOBAL_PERMISSIONS: {
        code: 'ASSIGN_GLOBAL_PERMISSIONS',
        scope: 'COMPANY'
    },

    // courses 
    VIEW_COMPANY_COURSES: {
        code: 'VIEW_COMPANY_COURSES',
        scope: 'COMPANY'
    },
    MANAGE_COMPANY: {
        code: 'MANAGE_COMPANY',
        scope: 'COMPANY'
    },
    MANAGE_COMPANY_COURSES: {
        code: 'MANAGE_COMPANY_COURSES',
        scope: 'COMPANY'
    },

    // misc
    ACCESS_ADMIN: {
        code: 'ACCESS_ADMIN',
        scope: 'GLOBAL'
    },
    ACCESS_APPLICATION: {
        code: 'ACCESS_APPLICATION',
        scope: 'GLOBAL'
    },
    MANAGE_SHOP: {
        code: 'MANAGE_SHOP',
        scope: 'GLOBAL'
    },
    DELETE_COMPANY: {
        code: 'DELETE_COMPANY',
        scope: 'GLOBAL'
    },
    CREATE_COMPANY: {
        code: 'CREATE_COMPANY',
        scope: 'GLOBAL'
    }
});