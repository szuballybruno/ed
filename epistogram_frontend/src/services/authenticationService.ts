import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { userRefreshIntervalInMs, verboseLogging } from '../Environemnt';
import { UserDTO } from '../models/shared_models/UserDTO';
import { httpGetAsync } from './httpClient';

export type AuthenticationStateType = "loading" | "authenticated" | "forbidden";

export const useUserFetching = (enabled: boolean) => {

    const [isBgFetchingEnabled, setIsBgFetchingEnabled] = useState(false);

    const bgFetchingEnabled = enabled && isBgFetchingEnabled;

    if (verboseLogging)
        console.log("Background current user fetching set to: " + bgFetchingEnabled);

    const queryResult = useQuery(
        'getCurrentUser',
        () => httpGetAsync("get-current-user"), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: bgFetchingEnabled ? userRefreshIntervalInMs : false,
        enabled: true,
        notifyOnChangeProps: ['isSuccess']
    });

    const { data: fetchedUser, refetch, isLoading, isFetching, isSuccess, isError } = queryResult;
    const currentUser = isError ? null : fetchedUser as UserDTO;

    // turn on background fetching if fetched successfully
    useEffect(() => {

        setIsBgFetchingEnabled(isSuccess);
    }, [isSuccess]);

    const authState = (isLoading || isFetching
        ? "loading"
        : currentUser
            ? "authenticated"
            : "forbidden") as AuthenticationStateType;

    const refetchUserAsync = async () => {

        console.log("Refetching user...");
        await refetch();
    }

    return {
        currentUser: fetchedUser as UserDTO,
        authState,
        refetchUserAsync
    };
}