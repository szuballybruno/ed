import { AssignablePermissionDTO } from '../../shared/dtos/AssignablePermissionDTO';
import { AssignableRoleDTO } from '../../shared/dtos/AssignableRoleDTO';
import { RoleAdminListDTO } from '../../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../../shared/dtos/role/RoleEditDTO';
import { UserPermissionDTO } from '../../shared/dtos/role/UserPermissionDTO';
import { UserRoleDTO } from '../../shared/dtos/role/UserRoleDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useRolesList = () => {

    const qr = useReactQuery2<RoleAdminListDTO[]>(apiRoutes.roles.getRoles);

    return {
        rolesList: qr.data ?? [],
        rolesListError: qr.error,
        rolesListState: qr.state,
        refetchRolesList: qr.refetch
    };
};

export const useAssignableRoles = (userId: number, companyId: number | null) => {

    const qr = useReactQuery2<AssignableRoleDTO[]>(apiRoutes.roles.getAssignableRoles, { companyId, userId }, !!companyId);

    return {
        assignableRolesList: qr.data ?? [],
        assignableRolesListError: qr.error,
        assignableRolesListState: qr.state,
        refetchAssignableRolesList: qr.refetch
    };
};

export const useAssignablePermissions = (userId: number, courseId: number | null, companyId: number | null) => {

    const qr = useReactQuery2<AssignablePermissionDTO[]>(apiRoutes.roles.getAssignablePermissions, { userId, courseId, companyId });

    return {
        assignablePermissionList: qr.data ?? [],
        assignablePermissionListError: qr.error,
        assignablePermissionListState: qr.state,
        refetchAssignablePermissionList: qr.refetch
    };
};

export const useUserRoles = (userId: number) => {

    const qr = useReactQuery2<UserRoleDTO[]>(apiRoutes.roles.getUserRoles, { userId });

    return {
        userRoles: qr.data ?? [],
        userRolesError: qr.error,
        userRolesState: qr.state,
        refetchUserRoles: qr.refetch
    };
};

export const useUserPermissions = (userId: number) => {

    const qr = useReactQuery2<UserPermissionDTO[]>(apiRoutes.roles.getUserPermissions, { userId });

    return {
        userPermissions: qr.data ?? [],
        userPermissionsError: qr.error,
        userPermissionsState: qr.state,
        refetchUserPermissions: qr.refetch
    };
};

export const useCreateRole = () => {

    const qr = usePostDataUnsafe<RoleCreateDTO>(apiRoutes.roles.createRole);

    return {
        createRoleAsync: qr.postDataAsync,
        createRoleState: qr.state
    };
};

export const useSaveRole = () => {

    const qr = usePostDataUnsafe<RoleEditDTO>(apiRoutes.roles.saveRole);

    return {
        saveRoleAsync: qr.postDataAsync,
        saveRoleState: qr.state
    };
};

export const useRoleEditData = (roleId: number, enabled: boolean) => {

    const qr = useReactQuery2<RoleEditDTO>(apiRoutes.roles.getRoleEditData, { roleId }, enabled);

    return {
        roleEditData: qr.data,
        roleEditDataError: qr.error,
        roleEditDataState: qr.state
    };
};

export const useDeleteRole = () => {

    const qr = usePostDataUnsafe<{ roleId: number }>(apiRoutes.roles.deleteRole);

    return {
        deleteRoleAsync: qr.postDataAsync,
        deleteRoleState: qr.state
    };
};