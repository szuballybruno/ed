import { Permission } from '../../models/entity/authorization/Permission';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { NoComplexTypes, NoIdType } from '../../utilities/misc';

type Constraint = { [K in PermissionCodeType]: NoIdType<NoComplexTypes<Permission>> };

export const permissionList = getSeedList<Permission, Constraint>()({

    // role admin 
    VIEW_GLOBAL_ROLES: {
        code: 'VIEW_GLOBAL_ROLES',
        scope: 'USER'
    },
    EDIT_GLOBAL_ROLES: {
        code: 'EDIT_GLOBAL_ROLES',
        scope: 'USER'
    },
    VIEW_COMPANY_ROLES: {
        code: 'VIEW_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    EDIT_COMPANY_ROLES: {
        code: 'EDIT_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    DELETE_GLOBAL_ROLES: {
        code: 'DELETE_COMPANY_ROLES',
        scope: 'COMPANY'
    },
    DELETE_COMPANY_ROLES: {
        code: 'DELETE_COMPANY_ROLES',
        scope: 'COMPANY'
    },

    // role assign
    ASSIGN_GLOBAL_ROLES: {
        code: 'ASSIGN_GLOBAL_ROLES',
        scope: 'COMPANY'
    },
    ASSIGN_COMPANY_ROLES: {
        code: 'ASSIGN_COMPANY_ROLES',
        scope: 'COMPANY'
    },

    // permissions 
    ASSIGN_GLOBAL_PERMISSIONS: {
        code: 'ASSIGN_GLOBAL_PERMISSIONS',
        scope: 'COMPANY'
    },
    ASSIGN_COMPANY_PERMISSIONS: {
        code: 'ASSIGN_COMPANY_PERMISSIONS',
        scope: 'COMPANY'
    },

    // courses 
    EDIT_COMPANY_COURSES: {
        code: 'EDIT_COMPANY_COURSES',
        scope: 'COMPANY'
    },
    DELETE_COMPANY_COURSES: {
        code: 'DELETE_COMPANY_COURSES',
        scope: 'COMPANY'
    },
    CREATE_COMPANY_COURSES: {
        code: 'CREATE_COMPANY_COURSES',
        scope: 'USER'
    },
    LIST_COMPANY_COURSES: {
        code: 'LIST_COMPANY_COURSES',
        scope: 'COMPANY'
    },
    WATCH_COURSE: {
        code: 'WATCH_COURSE',
        scope: 'COURSE'
    },
    WATCH_COMPANY_COURSES: {
        code: 'WATCH_COMPANY_COURSES',
        scope: 'COMPANY'
    },

    // manage company 
    EDIT_COMPANIES: {
        code: 'EDIT_COMPANIES',
        scope: 'USER'
    },
    DELETE_COMPANIES: {
        code: 'DELETE_COMPANIES',
        scope: 'USER'
    },
    CREATE_COMPANIES: {
        code: 'CREATE_COMPANIES',
        scope: 'USER'
    },

    // player 
    SET_COURSE_MODE: {
        code: 'SET_COURSE_MODE',
        scope: 'COURSE'
    },
    SET_COURSE_MODE_GLOBAL: {
        code: 'SET_COURSE_MODE_GLOBAL',
        scope: 'USER'
    },
    SET_TEMPOMAT_MODE: {
        code: 'SET_TEMPOMAT_MODE',
        scope: 'COURSE'
    },
    SET_TEMPOMAT_MODE_GLOBAL: {
        code: 'SET_TEMPOMAT_MODE_GLOBAL',
        scope: 'USER'
    },
    
    // admin
    VIEW_COURSE_ADMIN: {
        code: 'VIEW_COURSE_ADMIN',
        scope: 'COMPANY'
    },

    // misc company scoped 
    VIEW_SHOP: {
        code: 'VIEW_SHOP',
        scope: 'COMPANY'
    },
    VIEW_TEACHER_OVERVIEW: {
        code: 'VIEW_TEACHER_OVERVIEW',
        scope: 'COMPANY'
    },
    SET_JOB_TITLE: {
        code: 'SET_JOB_TITLE',
        scope: 'COMPANY'
    },
    EDIT_COURSE_OWNER_TEACHER_DATA: {
        code: 'EDIT_COURSE_OWNER_TEACHER_DATA',
        scope: 'COMPANY'
    },

    // misc
    SET_COURSE_OWNER_TEACHER_FLAG: {
        code: 'SET_COURSE_OWNER_TEACHER_FLAG',
        scope: 'USER'
    },
    ADD_EPISTO_COIN_TO_USERS: {
        code: 'ADD_EPISTO_COIN_TO_USERS',
        scope: 'USER'
    },
    VIEW_ANONYM_COMMENTER_NAME: {
        code: 'VIEW_ANONYM_COMMENTER_NAME',
        scope: 'USER'
    },
    ACCESS_ADMIN: {
        code: 'ACCESS_ADMIN',
        scope: 'USER'
    },
    ACCESS_APPLICATION: {
        code: 'ACCESS_APPLICATION',
        scope: 'USER'
    },
    MANAGE_SHOP: {
        code: 'MANAGE_SHOP',
        scope: 'USER'
    },
    SET_OWN_EMAIL_ADDRESS: {
        code: 'SET_OWN_EMAIL_ADDRESS',
        scope: 'USER'
    },
    IS_SIGNUP_MANDATORY: {
        code: 'IS_SIGNUP_MANDATORY',
        scope: 'USER'
    }
});