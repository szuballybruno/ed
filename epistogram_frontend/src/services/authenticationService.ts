import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { RefetchUserFunctionContext } from '../HOC/data_manager_frame/DataManagerFrame';
import { UserDTO } from '../models/shared_models/UserDTO';
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

    const [isBgFetchingEnabled, setIsBgFetchingEnabled] = useState(false);

    const bgFetchingEnabled = !nonAutomatic && isBgFetchingEnabled;

    console.log("Background current user fetching set to: " + bgFetchingEnabled);

    const queryResult = useQuery(
        'getCurrentUser',
        async () => (await httpGetAsync("get-current-user")).data, {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: bgFetchingEnabled ? userFetchingIntervalInS * 1000 : false,
        enabled: true,
        notifyOnChangeProps: ['data', 'isSuccess', 'isError']
    });

    const { data, refetch: refetchUser, isLoading, isFetching, isSuccess } = queryResult;

    useEffect(() => {

        setIsBgFetchingEnabled(isSuccess);
    }, [isSuccess]);

    const authState = new AuthenticationState(isLoading || isFetching, !!data);

    return {
        currentUser: data as UserDTO,
        authState,
        refetchUser
    };
}

export const useRenewUserSessionPooling = () => {

    const { isSuccess } = useQuery('renewUserSession', () => httpGetAsync("renew-user-session"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: userSessionRenewIntervalInS * 1000,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: []
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