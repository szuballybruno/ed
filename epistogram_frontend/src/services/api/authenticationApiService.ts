import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { fetchNewAccessTokenIntervalInMs, fetchUserIntervalInMs, verboseLogging } from '../../static/Environemnt';
import { httpGetAsync, usePostDataUnsafe } from '../core/httpClient';

export type AuthenticationStateType = 'loading' | 'authenticated' | 'forbidden';

export const useLogout = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.authentication.logoutUser);

    return {
        logoutUserState: qr.state,
        logoutUserAsync: qr.postDataAsync
    };
};

export const useUserFetching = (enabled: boolean) => {

    const [isBgFetchingEnabled, setIsBgFetchingEnabled] = useState(false);

    const bgFetchingEnabled = enabled && isBgFetchingEnabled;

    if (verboseLogging)
        console.log('Background current user fetching set to: ' + bgFetchingEnabled);

    const queryResult = useQuery(
        'getCurrentUser',
        () => httpGetAsync(apiRoutes.authentication.getCurrentUser), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: bgFetchingEnabled ? fetchUserIntervalInMs : false,
        enabled: true,
        notifyOnChangeProps: ['data', 'isSuccess', 'status']
    });

    const { data: fetchedUser, refetch, isLoading, isFetching, isSuccess, isError } = queryResult;
    const currentUser = isError ? null : fetchedUser as UserDTO;

    // turn on background fetching if fetched successfully
    useEffect(() => {

        setIsBgFetchingEnabled(isSuccess);
    }, [isSuccess]);

    const authState = (isLoading
        ? 'loading'
        : currentUser
            ? 'authenticated'
            : 'forbidden') as AuthenticationStateType;

    // console.log("-----");
    // console.log(authState);
    // console.log(isLoading);
    // console.log(isFetching);
    // console.log(queryResult);
    // console.log("-----");

    const refetchUserAsync = async () => {

        // console.log("Refetching user...");
        await refetch();
    };

    return {
        currentUser: fetchedUser as UserDTO,
        authState,
        refetchUserAsync
    };
};

export const useLogInUser = () => {

    type LoginUserDTO = {
        email: string;
        password: string;
    }

    const { postDataAsync, state } = usePostDataUnsafe<LoginUserDTO, void>(apiRoutes.authentication.loginUser);

    return {
        loginUserState: state,
        loginUserAsync: (email: string, password: string) => postDataAsync({
            email: email,
            password: password
        })
    };
};

export const useRenewUserSessionPooling = () => {

    const { isSuccess } = useQuery(
        ['renewUserSession'],
        () => httpGetAsync(apiRoutes.authentication.renewUserSession), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: fetchNewAccessTokenIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ['isSuccess']
    });

    return { isSuccess };
};