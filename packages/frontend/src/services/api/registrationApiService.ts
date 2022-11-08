import { RegisterUserViaActivationCodeDTO } from '@episto/communication';
import { RegisterUserViaInvitationTokenDTO } from '@episto/communication';
import { RegisterUserViaPublicTokenDTO } from '@episto/communication';
import { UserEditSaveDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { usePostDataUnsafe } from '../core/httpClient';

export const useRegisterUser = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.registration.registerViaPublicToken);

    const registerUserAsync = (
        regToken: string,
        emailAddress: string,
        firstName: string,
        lastName: string) => {

        return postDataResult
            .postDataAsync({
                registrationToken: regToken,
                firstName,
                lastName,
                emailAddress
            } as RegisterUserViaPublicTokenDTO);
    };

    return {
        registerUserState: postDataResult.state,
        registerUserAsync
    };
};

export const useRegisterInvitedUser = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.registration.registerViaInvitationToken);

    const registerInvitedUserAsync = (
        invitationToken: string,
        password: string,
        passwordCompare: string) => {

        return postDataResult
            .postDataAsync({
                invitationToken: invitationToken,
                password,
                passwordCompare
            } as RegisterUserViaInvitationTokenDTO);
    };

    return {
        registerInvitedUserState: postDataResult.state,
        registerInvitedUserAsync
    };
};

export const useRegisterUserViaActivationCode = () => {

    const postDataResult = usePostDataUnsafe<RegisterUserViaActivationCodeDTO>(apiRoutes.registration.registerViaActivationCode);

    return {
        registerUserViaActivationCodeState: postDataResult.state,
        registerUserViaActivationCodeAsync: postDataResult.postDataAsync
    };
};

export const useCreateInviteUserAsync = () => {

    const qr = usePostDataUnsafe<UserEditSaveDTO>(apiRoutes.invitation.inviteUser);

    return {
        createInvitedUser: qr.postDataAsync,
        createInvitedUserState: qr.state
    };
};