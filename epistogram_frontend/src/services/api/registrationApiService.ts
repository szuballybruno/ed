import { RegisterInvitedUserDTO } from "../../models/shared_models/RegisterInvitedUser";
import { RegisterUserDTO } from "../../models/shared_models/RegisterUserDTO";
import { RegisterUserViaActivationCodeDTO } from "../../models/shared_models/RegisterUserViaActivationCodeDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostDataUnsafe } from "../core/httpClient";

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
            } as RegisterUserDTO);
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
            } as RegisterInvitedUserDTO);
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