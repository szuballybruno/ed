import { Permission } from '../../models/entity/authorization/Permission';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const permissionList = getSeedList<Permission>()({

    // roles
    VIEW_COMPANY_ROLES: {
        code: 'VIEW_COMPANY_ROLES',
        isGlobal: false
    },
    EDIT_COMPANY_ROLES: {
        code: 'EDIT_COMPANY_ROLES',
        isGlobal: false
    },
    ASSIGN_COMPANY_ROLES: {
        code: 'ASSIGN_COMPANY_ROLES',
        isGlobal: false
    },
    DELETE_COMPANY_ROLES: {
        code: 'DELETE_COMPANY_ROLES',
        isGlobal: false
    },
    ASSIGN_GLOBAL_ROLES: {
        code: 'ASSIGN_GLOBAL_ROLES',
        isGlobal: true
    },
    EDIT_GLOBAL_ROLES: {
        code: 'EDIT_GLOBAL_ROLES',
        isGlobal: true
    },
    VIEW_GLOBAL_ROLES: {
        code: 'VIEW_GLOBAL_ROLES',
        isGlobal: true
    },

    // courses 
    VIEW_COMPANY_COURSES: {
        code: 'VIEW_COMPANY_COURSES',
        isGlobal: false
    },
    MANAGE_COMPANY: {
        code: 'MANAGE_COMPANY',
        isGlobal: false
    },
    MANAGE_COMPANY_COURSES: {
        code: 'MANAGE_COMPANY_COURSES',
        isGlobal: false
    },

    // misc
    ACCESS_ADMIN: {
        code: 'ACCESS_ADMIN',
        isGlobal: true
    },
    ACCESS_APPLICATION: {
        code: 'ACCESS_APPLICATION',
        isGlobal: true
    },
    MANAGE_SHOP: {
        code: 'MANAGE_SHOP',
        isGlobal: true
    },
    DELETE_COMPANY: {
        code: 'DELETE_COMPANY',
        isGlobal: true
    },
    CREATE_COMPANY: {
        code: 'CREATE_COMPANY',
        isGlobal: true
    }
});