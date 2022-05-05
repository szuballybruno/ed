import { RoleAdminListDTO } from '../../shared/dtos/role/RoleAdminListDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const useRolesList = () => {

    const qr = useReactQuery2<RoleAdminListDTO[]>(apiRoutes.roles.getRoles);

    return {
        rolesList: qr.data ?? [],
        rolesListError: qr.error,
        rolesListState: qr.state,
        refetchRolesList: qr.refetch
    };
};