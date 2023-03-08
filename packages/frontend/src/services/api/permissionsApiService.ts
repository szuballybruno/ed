import { apiRoutes, PermissionListDTO, UserCheckPermissionDTO } from '@episto/communication';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const usePermissionsList = () => {

    const qr = QueryService.useXQuery<PermissionListDTO[]>(apiRoutes.permissions.getPermissions);

    return {
        permissionsList: (qr.data ?? []) as any,
        permissionsListError: qr.error,
        permissionsListState: qr.state,
        refetchPermissionsList: qr.refetch
    };
};

export const useCheckPermission = () => {

    const qr = usePostDataUnsafe<UserCheckPermissionDTO, boolean>(apiRoutes.permissions.checkPermission);

    return {
        checkPermissionAsync: qr.postDataAsync,
        checkPermissionState: qr.state,
    };
};