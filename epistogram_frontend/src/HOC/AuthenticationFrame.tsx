import { createContext } from "react";
import { globalConfig } from "../configuration/config";
import { UserDTO } from "../models/shared_models/UserDTO";
import { AuthenticationState, useRenewUserSessionPooling, useUserFetching } from "../services/authenticationService";
import setTheme from "../services/setTheme";

export const CurrentUserContext = createContext<UserDTO | null>(null);
export const RefetchUserFunctionContext = createContext<() => void>(() => { });
export const AuthenticationStateContext = createContext<AuthenticationState>(new AuthenticationState(true, false));

export const AuthenticationFrame = (props) => {

    //SET THEME
    setTheme(globalConfig.currentTheme);

    // start auth pooling 
    const { isSuccess } = useRenewUserSessionPooling();
    console.log("Renewing token: " + isSuccess);

    // fetch current user 
    const { currentUser, refetchUser, authState } = useUserFetching(isSuccess);
    console.log("Authentication state: " + authState.asString());

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element
}
