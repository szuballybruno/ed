import { createContext, useEffect } from "react";
import { hotjar } from "react-hotjar";
import { oneSignalAppId, verboseLogging } from "../../Environemnt";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { AuthenticationStateType, useUserFetching } from "../../services/authenticationService";
import { useRenewUserSessionPooling } from "../../services/openEndpointService";
import setTheme from "../../services/setTheme";
import OneSignal from 'react-onesignal';
import { useLocation } from "react-router-dom";

export const CurrentUserContext = createContext<UserDTO | null>(null);
export const RefetchUserAsyncContext = createContext<() => Promise<void>>(() => Promise.resolve());
export const AuthenticationStateContext = createContext<AuthenticationStateType>("loading");

export const AuthenticationFrame = (props) => {

    //SET THEME
    setTheme("nextGenTheme");

    // initialize hotjar
    hotjar.initialize(2659369, 6)

    // initialzie OneSignal
    // This appId only work on dev
    useEffect(() => {

        if (oneSignalAppId)
            return;

        OneSignal
            .init({
                appId: oneSignalAppId
            });
    }, []);

    // start auth pooling
    const { isSuccess } = useRenewUserSessionPooling();

    if (verboseLogging)
        console.log("Renewing token: " + isSuccess);

    // fetch current user
    const { currentUser, refetchUserAsync, authState } = useUserFetching(isSuccess);

    if (verboseLogging)
        console.log("Authentication state: " + authState);

    // refetch user on route change
    const location = useLocation();

    useEffect(() => {

        refetchUserAsync();
    }, [location.pathname]);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserAsyncContext.Provider value={refetchUserAsync}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserAsyncContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element
}
