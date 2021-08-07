import { useQuery } from 'react-query';
import { httpGetAsync, httpPostAsync, HTTPResponse } from './httpClient';

const userFetchingIntervalInS = 15;
const userSessionRenewIntervalInS = 10;

export const useUserFetching = (nonAutomatic?: boolean) => {

    const { data, refetch: refetchUser, isSuccess } = useQuery('getCurrentUser', () => httpGetAsync("get-current-user"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: nonAutomatic ? false : userFetchingIntervalInS * 1000,
        refetchIntervalInBackground: true,
    });

    const currentUser = (isSuccess ? data?.data ?? null : null) as any | null;

    return { currentUser, refetchUser };
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
    validateHttpResponse(result);
}

export const registerUser = async (email: string, password: string) => {

    const result = await httpPostAsync("register-user", {
        email: email,
        password: password
    });

    validateHttpResponse(result);
}

const validateHttpResponse = (response: HTTPResponse) => {

    if (response.code == 200)
        return;

    throw new Error("Logout failed!" + response.data.msg);
}