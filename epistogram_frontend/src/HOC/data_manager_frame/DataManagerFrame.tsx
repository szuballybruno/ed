import { useState } from "@hookstate/core";
import { createContext, FunctionComponent } from "react";
import { globalConfig } from "../../configuration/config";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { AuthenticationState, useRenewUserSessionPooling, useUserFetching } from "../../services/authenticationService";
import { useGetUserDetails } from "../../services/dataService";
//import {hotjar} from "react-hotjar";
import setTheme from "../../services/setTheme";
import userDetailsState from "../../store/user/userSideState";

export const CurrentUserContext = createContext<UserDTO | null>(null);
export const RefetchUserFunctionContext = createContext<() => void>(() => { });
export const AuthenticationStateContext = createContext<AuthenticationState>(new AuthenticationState(true, false));

export const DataManagerFrame: FunctionComponent = (props) => {

    //DATA COLLECTOR SCRIPTS
    //hotjar.initialize(1954004, 0);

    //SET THEME
    setTheme(globalConfig.currentTheme);

    // fetch current user 
    const { currentUser, refetchUser, authState } = useUserFetching();
    console.log("Authentication state: " + authState.asString());

    // start auth pooling 
    useRenewUserSessionPooling();

    // get user id and set it to global state 
    const userId = currentUser?.userId ?? null;

    // get global data
    const { userDetails, loadingState } = useGetUserDetails(userId);

    // handle global data respones and loading states
    //applicationState.loadingIndicator.set(loadingState);

    const userDetailsStateHS = useState(userDetailsState);
    if (userDetails)
        userDetailsStateHS.set(userDetails);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element
}
