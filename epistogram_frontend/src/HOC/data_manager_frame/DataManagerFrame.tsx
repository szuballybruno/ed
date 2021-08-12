import { createContext, FunctionComponent, ReactNode, useEffect } from "react";
import { useState } from "@hookstate/core";
import applicationRunningState from "../../store/application/applicationRunningState";
import userSideState from "../../store/user/userSideState";
//import {hotjar} from "react-hotjar";
import setTheme from "../../services/setTheme";
import { globalConfig } from "../../configuration/config";
import { AxiosRequestConfig } from "axios";
import instance from "../../services/axiosInstance";
import Cookies from "universal-cookie";
import { useRenewUserSessionPooling, useUserFetching } from "../../services/authentication";

export class UserInfo {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}

export class AuthenticationState {
    isLoading: boolean;
    isAuthenticated: boolean;

    constructor(isLoading: boolean, isAuthenticated: boolean) {
        this.isLoading = isLoading;
        this.isAuthenticated = isAuthenticated;
    }

    asString() {

        return this.isLoading ? "loading" : this.isAuthenticated ? "authenticated" : "forbidden";
    }
}

export const CurrentUserContext = createContext<UserInfo | null>(null);
export const RefetchUserFunctionContext = createContext<() => void>(() => { });
export const IsAuthenticatedContext = createContext<AuthenticationState>(new AuthenticationState(true, false));


export const DataManagerFrame: FunctionComponent = (props) => {
    const { currentUser, refetchUser, isLoading } = useUserFetching();
    const authState = new AuthenticationState(isLoading, !!currentUser);

    useRenewUserSessionPooling();

    console.log("Authentication state: " + authState.asString());

    const cookies = new Cookies();
    //STATES
    const user = useState(userSideState)
    const app = useState(applicationRunningState)

    //DATA COLLECTOR SCRIPTS
    //hotjar.initialize(1954004, 0);

    //SET THEME
    setTheme(globalConfig.currentTheme);

    //LOADING INDICATOR METHODS
    const setLoadingOnRequest = (config: AxiosRequestConfig) => {
        app.loadingIndicator.set("loading")
        return config
    }


    //FIRST SCRIPTS ON THE PAGE
    useEffect(() => {
        const requestInterceptor =  instance.interceptors.request.use(setLoadingOnRequest)
        //TODO: Normális error handling
        instance.get(`users/${cookies.get("userId")}`).then((res) => {
            if (res.data) {
                user.set(res.data)
                app.loadingIndicator.set("succeeded")
            } else {
                app.loadingIndicator.set("failed")
            }
        }).catch((e) => {
            //app.loadingIndicator.set("failed")
            return e
        })

        instance.interceptors.request.eject(requestInterceptor)

        // eslint-disable-next-line
    },[app.isLoggedIn.get()])
    return <IsAuthenticatedContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </IsAuthenticatedContext.Provider> as JSX.Element
}
