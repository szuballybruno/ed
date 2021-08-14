import { useContext } from 'react';
import { useQuery } from 'react-query';
import { RefetchUserFunctionContext, UserInfo } from '../HOC/data_manager_frame/DataManagerFrame';
import { httpGetAsync, httpPostAsync, HTTPResponse } from './httpClient';

const userFetchingIntervalInS = 15;
const userSessionRenewIntervalInS = 10;

export class AuthenticationState {
    isLoading: boolean;
    isAuthenticated: boolean;

    constructor(isLoading: boolean, isAuthenticated: boolean) {
        this.isLoading = isLoading;
        this.isAuthenticated = isAuthenticated;
    }

    asString() {

        return this.isLoading ? "loading" : this.isAuthenticated ? "authenticated" : "forbidden";
    }
}

export const useUserFetching = (nonAutomatic?: boolean) => {

    const { data, refetch: refetchUser, isLoading, isFetching, isSuccess } = useQuery(
        'getCurrentUser',
        async () => (await httpGetAsync("get-current-user")).data, {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: nonAutomatic ? false : userFetchingIntervalInS * 1000,
        refetchIntervalInBackground: true,
        enabled: true,
        notifyOnChangeProps: ['data', 'isSuccess', 'isLoading']
    });

    const currentUser = (isSuccess
        ? data
            ? new UserInfo(data?.userId, data?.organizationId)
            : null
        : null) as UserInfo | null;

    const authState = new AuthenticationState(isLoading || isFetching, !!currentUser);

    return { currentUser, authState, refetchUser };
}

export const useRenewUserSessionPooling = () => {

    const { isSuccess } = useQuery('renewUserSession', () => httpGetAsync("renew-user-session"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: userSessionRenewIntervalInS * 1000,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ['isSuccess']
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