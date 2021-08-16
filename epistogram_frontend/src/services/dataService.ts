import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import instance from "../services/axiosInstance";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { UserSideStateIF } from "../store/user/UserSideStateIF";

export const useUserId = () => {

    const cookies = new Cookies();
    const userId = cookies.get("userId");

    return userId ? userId as number : null;
}

//onLoadingStateChanged: (loadingState: LoadingState) => void
export const useGetGlobalData = (userId: number | null) => {

    //STATES
    var loadingState = "loading" as LoadingStateType;
    var resultData = null as UserSideStateIF | null;

    //LOADING INDICATOR METHODS
    const setLoadingOnRequest = (config: AxiosRequestConfig) => {
        loadingState = "loading"
        return config
    }

    useEffect(() => {

        // do not query user data if user id is null
        if (!userId)
            return;

        const requestInterceptor = instance.interceptors.request.use(setLoadingOnRequest)
        //TODO: Normális error handling
        instance.get(`users/${userId}`).then((res) => {
            if (res.data) {
                resultData = (res.data)
                loadingState = "success"
            } else {
                loadingState = "failed"
            }
        }).catch((e) => {
            //app.loadingIndicator.set("failed")
            loadingState = "failed"
            return e
        })

        instance.interceptors.request.eject(requestInterceptor)

        // eslint-disable-next-line
    }, [userId])

    return { loadingState, resultData };
}