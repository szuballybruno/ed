import { useQuery } from "react-query";
import { refreshTokenRefreshIntervalInMs } from "../Environemnt";
import { useReactQuery } from "../frontendHelpers";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync, httpPostAsync, usePostData, usePostDataUnsafe } from "./httpClient";

type LoginUserDTO = {
    email: string;
    password: string;
}

export const useSignupData = () => {

    const qr = useReactQuery<SignupDataDTO>(
        ['getSignupData'],
        () => httpGetAsync(apiRoutes.open.getSignupData));

    return {
        signupData: qr.data,
        signupDataStatus: qr.status,
        signupDataError: qr.error,
        refetchSignupData: qr.refetch
    };
}

export const useRegisterUser = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.open.registerUser);

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

export const logOutUserAsync = async () => {

    await httpPostAsync(apiRoutes.open.logoutUser);
}

export const useLogInUser = () => {

    const { result, error, postDataAsync, state } = usePostData<LoginUserDTO, void>(apiRoutes.open.loginUser);

    return {
        loginUserState: state,
        loginUserError: error,
        loginUserAsync: (email: string, password: string) => postDataAsync({
            email: email,
            password: password
        })
    }
}

export const useRenewUserSessionPooling = () => {

    const { isSuccess } = useQuery(
        ['renewUserSession'],
        () => httpGetAsync(apiRoutes.open.renewUserSession), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: refreshTokenRefreshIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ["isSuccess"]
    });

    return { isSuccess };
}