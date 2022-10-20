import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { AuthDataDTO } from '../../shared/dtos/AuthDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { ErrorWithCode } from '../../shared/types/ErrorWithCode';
import { Environment } from '../../static/Environemnt';
import { eventBus } from '../../static/EventBus';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { httpGetAsync, usePostDataUnsafe } from '../core/httpClient';

export type AuthenticationStateType = 'idle' | 'loading' | 'authenticated' | 'forbidden' | 'error';

export const useLogout = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.authentication.logoutUser);

    return {
        logoutUserState: qr.state,
        logoutUserAsync: qr.postDataAsync
    };
};

export const useAuthHandshake = () => {

    const currentRoute = useGetCurrentAppRoute();
    const isEnabled = !currentRoute.isUnauthorized;

    const qr = useQuery(
        'useGetAuthHandshake',
        () => {

            const res = httpGetAsync(apiRoutes.authentication.establishAuthHandshake);

            eventBus.fireEvent('onAuthHandshake', {});

            return res;
        }, {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: Environment.getAuthHandshakeIntervalInMs,
        enabled: isEnabled,
        notifyOnChangeProps: ['data', 'isSuccess', 'status']
    });

    const { refetch, isLoading, isError, isIdle } = qr;
    const authData = isEnabled
        ? isError
            ? null
            : qr.data as AuthDataDTO
        : null;
    const error = qr.error as ErrorWithCode | null;

    const authState = ((): AuthenticationStateType => {

        if (isIdle || isEnabled)
            return 'idle';

        if (isLoading)
            return 'loading';

        if (authData)
            return 'authenticated';

        if (error?.code === 'forbidden')
            return 'forbidden';

        return 'error';
    })();

    const refetchAuthHandshake = useCallback(async (): Promise<AuthDataDTO> => {

        const result = await refetch();
        return result.data;
    }, [refetch]);

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