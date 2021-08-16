import { useState } from "@hookstate/core";
import { createContext, FunctionComponent } from "react";
import { globalConfig } from "../../configuration/config";
import { AuthenticationState, useRenewUserSessionPooling, useUserFetching } from "../../services/authenticationService";
import { useGetGlobalData } from "../../services/dataService";
//import {hotjar} from "react-hotjar";
import setTheme from "../../services/setTheme";
import userSideState from "../../store/user/userSideState";

export class UserInfo {
    userId: number;
    organizationId: number;

    constructor(userId: number, organizationId: number) {
        this.userId = userId;
        this.organizationId = organizationId;
    }
}

export const CurrentUserContext = createContext<UserInfo | null>(null);
export const RefetchUserFunctionContext = createContext<() => void>(() => { });
export const AuthenticationStateContext = createContext<AuthenticationState>(new AuthenticationState(true, false));

export const DataManagerFrame: FunctionComponent = (props) => {

    //DATA COLLECTOR SCRIPTS
    //hotjar.initialize(1954004, 0);

    //SET THEME
    setTheme(globalConfig.currentTheme);

    // get global states 
    // const applicationState = useState(applicationRunningState);
    const globalDataState = useState(userSideState);

    // fetch current user 
    const { currentUser, refetchUser, authState } = useUserFetching();
    console.log("Authentication state: " + authState.asString());

    // start auth pooling 
    useRenewUserSessionPooling();

    // get user id and set it to global state 
    const userId = currentUser?.userId ?? null;

    // get global data
    const { resultData, loadingState } = useGetGlobalData(userId);

    // handle global data respones and loading states
    //applicationState.loadingIndicator.set(loadingState);

    if (resultData)
        globalDataState.set(resultData);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element
}
