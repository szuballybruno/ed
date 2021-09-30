import { useReactQuery } from "../frontendHelpers";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { httpGetAsync } from "./httpClient";

export const useUserListQuery = (userId: number | null, searchText: string) => {

    const url = `users/get-user-administartion-user-list?userId=${userId}&searchData=${searchText || ""}`;

    const qr = useReactQuery(
        [
            'getCurrentUser',
            userId,
            searchText
        ],
        () => httpGetAsync(url));

    return {
        users: (qr.data ?? []) as AdminPageUserDTO[],
        usersStatus: qr.status,
        usersError: qr.error,
        refetchUsers: qr.refetch,
    };
}