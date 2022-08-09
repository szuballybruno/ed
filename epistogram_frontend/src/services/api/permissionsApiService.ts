import { PermissionListDTO } from '../../shared/dtos/role/PermissionListDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const usePermissionsList = () => {

    const qr = useReactQuery2<PermissionListDTO[]>(apiRoutes.permissions.getPermissions);

    return {
        permissionsList: qr.data ?? [],
        permissionsListError: qr.error,
        permissionsListState: qr.state,
        refetchPermissionsList: qr.refetch
    };
};