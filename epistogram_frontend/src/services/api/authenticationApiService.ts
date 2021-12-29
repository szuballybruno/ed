import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { refreshTokenRefreshIntervalInMs, userRefreshIntervalInMs, verboseLogging } from "../../static/Environemnt";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { httpGetAsync, usePostData, usePostDataUnsafe } from "../core/httpClient";

export type AuthenticationStateType = "loading" | "authenticated" | "forbidden";

export const useLogout = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.authentication.logoutUser);

    return {
        logoutUserState: qr.state,
        logoutUserAsync: qr.postDataAsync
    }
}

export const useUserFetching = (enabled: boolean) => {

    const [isBgFetchingEnabled, setIsBgFetchingEnabled] = useState(false);

    const bgFetchingEnabled = enabled && isBgFetchingEnabled;

    if (verboseLogging)
        console.log("Background current user fetching set to: " + bgFetchingEnabled);

    const queryResult = useQuery(
        'getCurrentUser',
        () => httpGetAsync(apiRoutes.authentication.getCurrentUser), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: bgFetchingEnabled ? userRefreshIntervalInMs : false,
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
        ? "loading"
        : currentUser
            ? "authenticated"
            : "forbidden") as AuthenticationStateType;

    // console.log("-----");
    // console.log(authState);
    // console.log(isLoading);
    // console.log(isFetching);
    // console.log(queryResult);
    // console.log("-----");

    const refetchUserAsync = async () => {

        // console.log("Refetching user...");
        await refetch();
    }

    return {
        currentUser: fetchedUser as UserDTO,
        authState,
        refetchUserAsync
    };
}

export const useLogInUser = () => {

    type LoginUserDTO = {
        email: string;
        password: string;
    }

    const { error, postDataAsync, state } = usePostData<LoginUserDTO, void>(apiRoutes.authentication.loginUser);

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
        () => httpGetAsync(apiRoutes.authentication.renewUserSession), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: refreshTokenRefreshIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ["isSuccess"]
    });

    return { isSuccess };
}