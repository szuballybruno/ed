import { AssignableRoleDTO } from '../../shared/dtos/AssignableRoleDTO';
import { RoleAdminListDTO } from '../../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../../shared/dtos/role/RoleEditDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';

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

export const useRoleEditData = (roleId: Id<'Role'>, enabled: boolean) => {

    const qr = QueryService.useXQuery<RoleEditDTO>(apiRoutes.roles.getRoleEditData, { roleId }, enabled);

    return {
        roleEditData: qr.data,
        roleEditDataError: qr.error,
        roleEditDataState: qr.state
    };
};

export const useDeleteRole = () => {

    const qr = usePostDataUnsafe<{ roleId: Id<'Role'> }>(apiRoutes.roles.deleteRole);

    return {
        deleteRoleAsync: qr.postDataAsync,
        deleteRoleState: qr.state
    };
};