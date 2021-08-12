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
import { useRenewUserSessionPooling, useUserFetching } from "../../services/authenticationService";
import { useGetGlobalData, useUserId } from "../../services/dataService";

export class UserInfo {
    userId: number;
    organizationId: number;

    constructor(userId: number, organizationId: number) {
        this.userId = userId;
        this.organizationId = organizationId;
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

    //DATA COLLECTOR SCRIPTS
    //hotjar.initialize(1954004, 0);

    //SET THEME
    setTheme(globalConfig.currentTheme);

    // get global states 
    const applicationState = useState(applicationRunningState);
    const globalDataState = useState(userSideState);

    // fetch current user 
    const { currentUser, refetchUser, isLoading } = useUserFetching();
    const authState = new AuthenticationState(isLoading, !!currentUser);
    console.log("Authentication state: " + authState.asString());

    // start auth pooling 
    useRenewUserSessionPooling();

    // get user id and set it to global state 
    const userId = currentUser?.userId ?? null;
    applicationState.isLoggedIn.set(authState.isAuthenticated);

    // get global data
    const { resultData, loadingState } = useGetGlobalData(userId);

    // handle global data respones and loading states
    applicationState.loadingIndicator.set(loadingState);

    if (resultData)
        globalDataState.set(resultData);

    return <IsAuthenticatedContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </IsAuthenticatedContext.Provider> as JSX.Element
}
