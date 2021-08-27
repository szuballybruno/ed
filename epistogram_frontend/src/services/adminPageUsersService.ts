import { useQuery } from "react-query";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { httpGetAsync } from "./httpClient";

export const useUserListQuery = (userId: number | null, searchText: string) => {

    const url = `users/get-user-administartion-user-list?userId=${userId}&searchData=${searchText || ""}`;

    const { data, refetch: fetchUsers, status } = useQuery(
        [
            'getCurrentUser',
            userId,
            searchText
        ],
        () => httpGetAsync(url), {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!userId,
        refetchOnReconnect: true,
        refetchOnMount: true
    });

    return {
        users: (data ?? []) as AdminPageUserDTO[],
        fetchUsers,
        status: status as LoadingStateType
    };
}