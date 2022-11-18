import { PermissionListDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { QueryService } from '../../static/XQuery/XQueryReact';

export const usePermissionsList = () => {

    const qr = QueryService.useXQuery<PermissionListDTO[]>(apiRoutes.permissions.getPermissions);

    return {
        permissionsList: (qr.data ?? []) as any,
        permissionsListError: qr.error,
        permissionsListState: qr.state,
        refetchPermissionsList: qr.refetch
    };
};