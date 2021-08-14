import { useContext } from 'react';
import { useQuery } from 'react-query';
import { RefetchUserFunctionContext, UserInfo } from '../HOC/data_manager_frame/DataManagerFrame';
import { httpGetAsync, httpPostAsync, HTTPResponse } from './httpClient';

const userFetchingIntervalInS = 15;
const userSessionRenewIntervalInS = 10;

export const useUserFetching = (nonAutomatic?: boolean) => {

    const { data, refetch: refetchUser, isLoading, isFetching, isSuccess } = useQuery('getCurrentUser', () => httpGetAsync("get-current-user"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: nonAutomatic ? false : userFetchingIntervalInS * 1000,
        refetchIntervalInBackground: true,
        enabled: true
    });

    const currentUser = (isSuccess
        ? data?.data
            ? new UserInfo(data?.data?.userId, data?.data?.organizationId)
            : null
        : null) as UserInfo | null;

    return { currentUser, refetchUser, isLoading, isFetching };
}

export const useRenewUserSessionPooling = () => {

    const { data, refetch: refetchUser, isSuccess } = useQuery('renewUserSession', () => httpGetAsync("renew-user-session"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: userSessionRenewIntervalInS * 1000,
        refetchIntervalInBackground: true,
    });

    isSuccess
        ? console.log("User session renewed.")
        : console.warn("Failed to renew user session.");
}

export const logOutUserAsync = async () => {

    const result = await httpPostAsync("log-out-user");
    //rewrite with instance.post
    validateHttpResponse(result);
}

export const useLogInUser = () => {

    const refetchUser = useContext(RefetchUserFunctionContext);

    return async (email: string, password: string) => {

        const result = await httpPostAsync("login-user", {
            email: email,
            password: password
        });

        // validateHttpResponse(result);
        refetchUser();

        return result;
    }
}

const validateHttpResponse = (response: HTTPResponse) => {

    if (response.code === 200)
        return;

    throw new Error("Logout failed!" + response.data.msg);
}