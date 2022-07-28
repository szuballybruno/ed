import { PermissionScopeType } from './sharedTypes';
import { Id } from './versionId';

type ConstraintObjectPropsType<TObject, TPropertyValue> = { [K in keyof TObject]: TPropertyValue };

export type PermissionCodeDefType = { code: string, scope: PermissionScopeType };

const fn = <T extends ConstraintObjectPropsType<T, PermissionCodeDefType>>(obj: T) => obj;

export const permissionCodes = fn({
    VIEW_PREDEFINED_ROLES: {
        code: 'VIEW_PREDEFINED_ROLES',
        scope: 'USER'
    },
    EDIT_PREDEFINED_ROLES: {
        code: 'EDIT_PREDEFINED_ROLES',
        scope: 'USER'
    },
    VIEW_CUSTOM_ROLES: {
        code: 'VIEW_CUSTOM_ROLES',
        scope: 'COMPANY'
    },
    EDIT_CUSTOM_ROLES: {
        code: 'EDIT_CUSTOM_ROLES',
        scope: 'COMPANY'
    },
    DELETE_PREDEFINED_ROLES: {
        code: 'DELETE_CUSTOM_ROLES',
        scope: 'COMPANY'
    },
    DELETE_CUSTOM_ROLES: {
        code: 'DELETE_CUSTOM_ROLES',
        scope: 'COMPANY'
    },

    // role assign
    ASSIGN_PREDEFINED_ROLES: {
        code: 'ASSIGN_PREDEFINED_ROLES',
        scope: 'COMPANY'
    },
    ASSIGN_CUSTOM_ROLES: {
        code: 'ASSIGN_CUSTOM_ROLES',
        scope: 'COMPANY'
    },

    // permissions 
    VIEW_PERMISSIONS: {
        code: 'VIEW_PERMISSIONS',
        scope: 'USER'
    },
    ASSIGN_GLOBAL_PERMISSIONS: {
        code: 'ASSIGN_GLOBAL_PERMISSIONS',
        scope: 'COMPANY'
    },
    ASSIGN_COMPANY_PERMISSIONS: {
        code: 'ASSIGN_COMPANY_PERMISSIONS',
        scope: 'COMPANY'
    },
    ASSIGN_COURSE_PERMISSIONS: {
        code: 'ASSIGN_COURSE_PERMISSIONS',
        scope: 'USER'
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
    EDIT_COURSES: {
        code: 'EDIT_COURSE',
        scope: 'USER'
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
    EDIT_COMPANY: {
        code: 'EDIT_COMPANY',
        scope: 'COMPANY'
    },
    DELETE_COMPANIES: {
        code: 'DELETE_COMPANIES',
        scope: 'USER'
    },
    CREATE_COMPANIES: {
        code: 'CREATE_COMPANIES',
        scope: 'USER'
    },
    ASSIGN_ROLES_TO_COMPANY: {
        code: 'ASSIGN_ROLES_TO_COMPANY',
        scope: 'COMPANY'
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
    VIEW_DAILY_TIP_ADMIN: {
        code: 'VIEW_DAILY_TIP_ADMIN',
        scope: 'USER'
    },

    // misc company scoped 
    VIEW_SHOP: {
        code: 'VIEW_SHOP',
        scope: 'COMPANY'
    },
    VIEW_TEACHER_OVERVIEW: {
        code: 'VIEW_TEACHER_OVERVIEW',
        scope: 'USER'
    },
    SET_JOB_TITLE: {
        code: 'SET_JOB_TITLE',
        scope: 'USER'
    },
    EDIT_COURSE_OWNER_TEACHER_DATA: {
        code: 'EDIT_COURSE_OWNER_TEACHER_DATA',
        scope: 'USER'
    },

    // user

    CREATE_NEW_USER: {
        code: 'CREATE_NEW_USER',
        scope: 'USER'
    },
    EDIT_USER: {
        code: 'EDIT_USER',
        scope: 'USER'
    },
    DELETE_USER: {
        code: 'DELETE_USER',
        scope: 'USER'
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
    },
    EDIT_COMMENT: {
        code: 'EDIT_COMMENT',
        scope: 'COMMENT'
    },
    DELETE_COMMENT: {
        code: 'DELETE_COMMENT',
        scope: 'COMMENT'
    }
} as const);

export type PermissionCodesObjectType = typeof permissionCodes;

export type PermissionCodeType = keyof typeof permissionCodes;

type ScopeParamByScopeType<T extends PermissionScopeType> = T extends 'COMPANY'
    ? {
        companyId: Id<'Company'>
    }
    : T extends 'COURSE'
    ? {
        courseId: Id<'Course'>
    }
    : T extends 'COMMENT'
    ? {
        commentId: Id<'Comment'>
    }
    : void;

export type GetPermissionScope<TCode extends PermissionCodeType> = PermissionCodesObjectType[TCode]['scope'];

export type GetParamByCodeType<TCode extends PermissionCodeType> = ScopeParamByScopeType<GetPermissionScope<TCode>>;
