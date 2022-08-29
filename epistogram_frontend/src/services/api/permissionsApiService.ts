import { PermissionListDTO } from '../../shared/dtos/role/PermissionListDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';

export const usePermissionsList = () => {

    const qr = QueryService.useXQuery<PermissionListDTO[]>(apiRoutes.permissions.getPermissions);

    return {
        permissionsList: qr.data ?? [],
        permissionsListError: qr.error,
        permissionsListState: qr.state,
        refetchPermissionsList: qr.refetch
    };
};