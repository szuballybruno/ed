import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { globalConfig } from '../configuration/config';
import { userRefreshIntervalInMs as userRefreshIntervalInMs } from '../Environemnt';
import { UserDTO } from '../models/shared_models/UserDTO';
import { httpGetAsync } from './httpClient';

export type AuthenticationStateType = "loading" | "authenticated" | "forbidden";

export const useUserFetching = (enabled: boolean) => {

    const [isBgFetchingEnabled, setIsBgFetchingEnabled] = useState(false);

    const bgFetchingEnabled = enabled && isBgFetchingEnabled;

    if (globalConfig.verboseLogging)
        console.log("Background current user fetching set to: " + bgFetchingEnabled);

    const queryResult = useQuery(
        'getCurrentUser',
        () => httpGetAsync("get-current-user"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: bgFetchingEnabled ? userRefreshIntervalInMs : false,
        enabled: true,
        notifyOnChangeProps: ['data', 'isSuccess', 'isError']
    });

    const { data: currentUser, refetch, isLoading, isFetching, isSuccess } = queryResult;

    useEffect(() => {

        setIsBgFetchingEnabled(isSuccess);
    }, [isSuccess]);

    const authState = (isLoading || isFetching
        ? "loading"
        : currentUser
            ? "authenticated"
            : "forbidden") as AuthenticationStateType;

    const refetchUserAsync = async () => {

        await refetch();
    }

    return {
        currentUser: currentUser as UserDTO,
        authState,
        refetchUserAsync
    };
}