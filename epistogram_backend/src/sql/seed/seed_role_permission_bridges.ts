import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { permissionList } from './seed_permissions';
import { roleList } from './seed_roles';

export const rolePermissionList = getSeedList<RolePermissionBridge>()({
    
    owner_a: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_COMPANY_ROLES.id,
    },
    owner_b: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_GLOBAL_ROLES.id,
    },
    owner_c: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.DELETE_COMPANY_ROLES.id,
    },
    owner_d: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.VIEW_COMPANY_ROLES.id,
    },
    owner_e: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.MANAGE_COMPANY.id,
    },
    owner_f: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_COMPANY_ROLES.id,
    },
    owner_g: {
        roleId: roleList.Company_Owner.id,
        permissionId: permissionList.ASSIGN_COMPANY_PERMISSIONS.id,
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
    },
});