import { useQuery } from 'react-query';
import { httpGet } from './httpClient';

const userFetchingIntervalInS = 15;
const userSessionRenewIntervalInS = 10;

export const useUserFetching = (nonAutomatic?: boolean) => {

    const { data, refetch: refetchUser, isSuccess } = useQuery('getCurrentUser', () => httpGet("get-current-user"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: nonAutomatic ? false : userFetchingIntervalInS * 1000,
        refetchIntervalInBackground: true,
    });

    const currentUser = (isSuccess ? data?.data ?? null : null) as any | null;

    return { currentUser, refetchUser };
}

export const useRenewUserSessionPooling = () => {

    const { data, refetch: refetchUser, isSuccess } = useQuery('renewUserSession', () => httpGet("renew-user-session"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: userSessionRenewIntervalInS * 1000,
        refetchIntervalInBackground: true,
    });

    console.log("Usen session renewal " + isSuccess);
}
