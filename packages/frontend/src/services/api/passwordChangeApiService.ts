import { apiRoutes } from '../../shared/types/apiRoutes';
import { usePostDataUnsafe } from '../core/httpClient';

export const useRequestPasswordChange = () => {

    const qr = usePostDataUnsafe<{ email: string }, void>(apiRoutes.passwordChange.requestPasswordChange);

    return {
        requestPasswordChangeAsync: qr.postDataAsync,
        requestPasswordChangeState: qr.state
    };
};

export const useRequestPasswordChangeAuthenticated = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.passwordChange.requestPasswordChangeAuthenticated);

    const requestChangePasswordAsync = (oldPassword: string) => {

        return postDataResult
            .postDataAsync({ oldPassword: oldPassword });
    };

    return {
        requestChangePasswordState: postDataResult.state,
        requestChangePasswordAsync
    };
};

export const useSetNewPassword = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.passwordChange.setNewPassword);

    const setNewPassword = (password: string, passwordCompare: string, passwordResetToken: string) => {

        return postDataResult
            .postDataAsync({
                password,
                passwordCompare,
                passwordResetToken
            });
    };

    return {
        setNewPasswordState: postDataResult.state,
        setNewPassword
    };
};