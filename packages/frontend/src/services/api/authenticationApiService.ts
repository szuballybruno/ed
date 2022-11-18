import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { AuthDataDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { Environment } from '../../static/Environemnt';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { httpGetAsync, usePostDataUnsafe } from '../core/httpClient';
import { GlobalEventManagerType } from '../../components/system/EventManagerFrame';

export type AuthenticationStateType = 'idle' | 'loading' | 'authenticated' | 'forbidden' | 'error';

export const useLogout = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.authentication.logoutUser);

    return {
        logoutUserState: qr.state,
        logoutUserAsync: qr.postDataAsync
    };
};

export const useAuthHandshake = (globalEventManager: GlobalEventManagerType) => {

    const currentRoute = useGetCurrentAppRoute();
    const isEnabled = !currentRoute.isUnauthorized;

    const queryFn = useCallback(() => {

        const res = httpGetAsync(apiRoutes.authentication.establishAuthHandshake);

        globalEventManager
            .fireEvent('onAuthHandshake', {});

        return res;
    }, []);

    const qr = useQuery(
        'useGetAuthHandshake',
        queryFn, {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: Environment.getAuthHandshakeIntervalInMs,
        enabled: isEnabled,
        notifyOnChangeProps: ['data', 'isSuccess', 'status']
    });

    const { refetch, isLoading, isError, isIdle } = qr;
    const authData = isError
        ? null
        : qr.data as AuthDataDTO;

    const error = qr.error as ErrorWithCode | null;

    const authState = ((): AuthenticationStateType => {

        if (isIdle)
            return 'idle';

        if (isLoading)
            return 'loading';

        if (authData)
            return 'authenticated';

        if (error?.code === 'forbidden')
            return 'forbidden';

        if (isError)
            return 'error';

        throw new Error('Something is not right...');
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