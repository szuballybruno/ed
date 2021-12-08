import { useQuery } from "react-query";
import { refreshTokenRefreshIntervalInMs } from "../Environemnt";
import { useReactQuery } from "../frontendHelpers";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { RegisterInvitedUserDTO } from "../models/shared_models/RegisterInvitedUser";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync, usePostData, usePostDataUnsafe } from "./core/httpClient";

type LoginUserDTO = {
    email: string;
    password: string;
}

export const useSignupData = () => {

    const qr = useReactQuery<SignupDataDTO>(
        ['getSignupData'],
        () => httpGetAsync(apiRoutes.signup.getSignupData));

    return {
        signupData: qr.data,
        signupDataStatus: qr.status,
        signupDataError: qr.error,
        refetchSignupData: qr.refetch
    };
}

export const useAnswerSignupQuestion = () => {

    const qr = usePostDataUnsafe<AnswerSignupQuestionDTO, AnswerDTO>(apiRoutes.signup.answerSignupQuestion);

    return {
        saveAnswersStatus: qr.state,
        saveAnswersAsync: qr.postDataAsync,
        correctAnswerId: qr.result?.answerId ?? null
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

export const useRegisterInvitedUser = () => {

    const postDataResult = usePostDataUnsafe(apiRoutes.open.registerInvitedUser);

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

export const useLogInUser = () => {

    const { error, postDataAsync, state } = usePostData<LoginUserDTO, void>(apiRoutes.public.loginUser);

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