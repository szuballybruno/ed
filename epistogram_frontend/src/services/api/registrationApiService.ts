import { CreateInvitedUserDTO } from "../../models/shared_models/CreateInvitedUserDTO";
import { RegisterUserViaActivationCodeDTO } from "../../models/shared_models/RegisterUserViaActivationCodeDTO";
import { RegisterUserViaInvitationTokenDTO } from "../../models/shared_models/RegisterUserViaInvitationTokenDTO";
import { RegisterUserViaPublicTokenDTO } from "../../models/shared_models/RegisterUserViaPublicTokenDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { httpPostAsync, usePostDataUnsafe } from "../core/httpClient";

export const useRegisterUser = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.registration.registerUserViaPublicToken);

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
    }

    return {
        registerUserState: postDataResult.state,
        registerUserAsync
    }
}

export const useRegisterInvitedUser = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.registration.registerUserViaInvitationToken);

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
    }

    return {
        registerInvitedUserState: postDataResult.state,
        registerInvitedUserAsync
    }
}

export const useRegisterUserViaActivationCode = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.registration.registerUserViaActivationCode);

    const registerUserViaActivationCodeAsync = (
        activationCode: string,
        emailAddress: string,
        firstName: string,
        lastName: string) => {

        return postDataResult
            .postDataAsync({
                activationCode,
                emailAddress,
                firstName,
                lastName
            } as RegisterUserViaActivationCodeDTO);
    }

    return {
        registerUserViaActivationCodeState: postDataResult.state,
        registerUserViaActivationCodeAsync
    }
}

export const inviteUserAsync = (dto: CreateInvitedUserDTO) => {

    return httpPostAsync(apiRoutes.registration.inviteUser, dto);
}