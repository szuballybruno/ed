import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { permissionList } from './seed_permissions';
import { roleList } from './seed_roles';
import { getSeedList } from './seed_test';

export const rolePermissionList = getSeedList<RolePermissionBridge>()({
    manager_: {
        roleId: roleList.Company_Manager.id,
        permissionId: permissionList.ASSIGN_COMPANY_ROLES.id,
    },
    manager__: {
        roleId: roleList.Company_Manager.id,
        permissionId: permissionList.ASSIGN_GLOBAL_ROLES.id,
    },
    manager___: {
        roleId: roleList.Company_Manager.id,
        permissionId: permissionList.DELETE_COMPANY_ROLES.id,
    },
    manager____: {
        roleId: roleList.Company_Manager.id,
        permissionId: permissionList.VIEW_COMPANY_ROLES.id,
    },

    role_manager_a: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.VIEW_COMPANY_ROLES.id,
    },
    role_manager_b: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.ASSIGN_GLOBAL_ROLES.id,
    },
    role_manager_c: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.ASSIGN_COMPANY_ROLES.id,
    },
    role_manager_d: {
        roleId: roleList.Company_Role_Manager.id,
        permissionId: permissionList.DELETE_COMPANY_ROLES.id,
    },

    company_user_a: {
        roleId: roleList.Company_User.id,
        permissionId: permissionList.VIEW_COMPANY_COURSES.id
    }
});