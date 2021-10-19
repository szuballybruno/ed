import { useReactQuery } from "../frontendHelpers";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync } from "./httpClient";

export const useUserListQuery = () => {

    const qr = useReactQuery<AdminPageUserDTO[]>(
        ['userListQuery'],
        () => httpGetAsync(apiRoutes.userManagement.getUserListForAdministration));

    return {
        users: qr.data ?? [],
        usersStatus: qr.status,
        usersError: qr.error,
        refetchUsers: qr.refetch,
    };
}