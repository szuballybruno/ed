import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import { useReactQuery } from "../frontendHelpers";
import { IdType } from "../models/shared_models/types/sharedTypes";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { IUserDetails } from "../store/user/UserSideStateIF";
import { httpGetAsync } from "./httpClient";

export const useUserId = () => {

    const cookies = new Cookies();
    const userId = cookies.get("userId");

    return userId ? userId as number : null;
}

export const useGetUserDetails = (userId: IdType | null) => {

    const url = `users/${userId}`;
    const { data: userDetails, status } = useQuery(
        [
            'getUserDetails',
            userId
        ],
        async () => (await httpGetAsync(url)).data as IUserDetails, {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!userId
    });

    return {
        userDetails,
        status: status as LoadingStateType
    };
}

export const useOverviewPageDTO = () => {

    const queryRes = useReactQuery(
        ["overviewPageDTOQuery"],
        () => httpGetAsync("get-overview-page-dto"));

    return {
        pageDTO: queryRes.data,
        status: queryRes.status,
        error: queryRes.error
    }
}