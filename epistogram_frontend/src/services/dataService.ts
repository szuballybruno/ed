import { createContext, FunctionComponent, ReactNode, useEffect } from "react";
import { useState } from "@hookstate/core";
import applicationRunningState from "../store/application/applicationRunningState";
import userSideState from "../store/user/userSideState";
//import {hotjar} from "react-hotjar";
import setTheme from "../services/setTheme";
import { globalConfig } from "../configuration/config";
import { AxiosRequestConfig } from "axios";
import instance from "../services/axiosInstance";
import Cookies from "universal-cookie";
import { useRenewUserSessionPooling, useUserFetching } from "../services/authentication";
import { LoadingState } from "../store/application/ApplicationRunningStateInterface";
import { UserSideStateIF } from "../store/user/UserSideStateIF";

export const useUserId = () => {

    const cookies = new Cookies();
    const userId = cookies.get("userId");

    return userId ? userId as number : null;
}

//onLoadingStateChanged: (loadingState: LoadingState) => void
export const useGetGlobalData = (userId: number | null) => {

    //STATES
    var loadingState = "loading" as LoadingState;
    var resultData = null as UserSideStateIF | null;

    //LOADING INDICATOR METHODS
    const setLoadingOnRequest = (config: AxiosRequestConfig) => {
        loadingState = "loading"
        return config
    }

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(setLoadingOnRequest)
        //TODO: Normális error handling
        instance.get(`users/${userId}`).then((res) => {
            if (res.data) {
                resultData = (res.data)
                loadingState = "succeeded"
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