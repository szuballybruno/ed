import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { AuthDataDTO } from '../../shared/dtos/AuthDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { ErrorWithCode } from '../../shared/types/ErrorWithCode';
import { Environment } from '../../static/Environemnt';
import { httpGetAsync, usePostDataUnsafe } from '../core/httpClient';

export type AuthenticationStateType = 'loading' | 'authenticated' | 'forbidden' | 'error';

export const useLogout = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.authentication.logoutUser);

    return {
        logoutUserState: qr.state,
        logoutUserAsync: qr.postDataAsync
    };
};

export const useGetAuthHandshake = () => {

    const qr = useQuery(
        'useGetAuthHandshake',
        () => httpGetAsync(apiRoutes.authentication.establishAuthHandshake), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: Environment.getAuthHandshakeIntervalInMs,
        enabled: true,
        notifyOnChangeProps: ['data', 'isSuccess', 'status']
    });

    const { refetch, isLoading, isError } = qr;
    const authData = isError ? null : qr.data as AuthDataDTO;
    const error = qr.error as ErrorWithCode | null;

    const authState = ((): AuthenticationStateType => {

        if (isLoading)
            return 'loading';

        if (authData)
            return 'authenticated';

        if (error?.code === 'forbidden')
            return 'forbidden';

        return 'error';
    })();

    const refetchAuthHandshake = useCallback((): Promise<void> => refetch() as any, [refetch]);

    return {
        authData: authData,
        authState,
        refetchAuthHandshake
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