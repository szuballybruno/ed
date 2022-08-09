import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { PermissionsSeedDataType } from './seed_permissions';
import { RolesSeedDataType } from './seed_roles';

export const getRolePermissionBridgeSeedData = (permissionList: PermissionsSeedDataType, roleList: RolesSeedDataType) => getSeedList<RolePermissionBridge>()({

    owner_a: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_CUSTOM_ROLES.id,
    },
    owner_b: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_PREDEFINED_ROLES.id,
    },
    owner_c: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.DELETE_CUSTOM_ROLES.id,
    },
    owner_d: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.VIEW_CUSTOM_ROLES.id,
    },
    owner_e: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.EDIT_COMPANY.id,
    },
    owner_f: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_COMPANY_PERMISSIONS.id,
    },

    role_manager_a: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.VIEW_CUSTOM_ROLES.id,
    },
    role_manager_b: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.ASSIGN_PREDEFINED_ROLES.id,
    },
    role_manager_c: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.ASSIGN_CUSTOM_ROLES.id,
    },
    role_manager_d: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.DELETE_CUSTOM_ROLES.id,
    },

    company_user_a: {
        roleId: roleList.Company_User.id,
        permissionId: permissionList.WATCH_COMPANY_COURSES.id
    },
});