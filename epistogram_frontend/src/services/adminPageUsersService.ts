import { useQuery } from "react-query";
import { AdminPageUserView } from "../models/shared_models/AdminPageUserDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { httpGetAsync } from "./httpClient";

export const useUserListQuery = (user: UserDTO | null, searchText: string) => {

    const userId = user?.userId;
    const organizationId = user?.organizationId;
    const url = `users/?userId=${userId}&organizationId=${organizationId}&searchData=${searchText || ""}`;

    const { data, refetch: fetchUsers, status } = useQuery(
        [
            'getCurrentUser',
            userId,
            organizationId,
            searchText
        ],
        () => httpGetAsync(url), {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!userId && !!organizationId,
        refetchOnReconnect: true,
        refetchOnMount: true
    });

    return {
        users: (data ?? []) as AdminPageUserView[],
        fetchUsers,
        status: status as LoadingStateType
    };
}