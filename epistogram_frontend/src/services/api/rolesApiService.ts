import { RoleAdminListDTO } from '../../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../../shared/dtos/role/RoleEditDTO';
import { RoleDTO } from '../../shared/dtos/RoleDTO';
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