import { ChakraProvider } from "@chakra-ui/react";
import { createContext, FunctionComponent } from "react";
import { globalConfig } from "../../configuration/config";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { AuthenticationState, useRenewUserSessionPooling, useUserFetching } from "../../services/authenticationService";
import setTheme from "../../services/setTheme";

export const CurrentUserContext = createContext<UserDTO | null>(null);
export const RefetchUserFunctionContext = createContext<() => void>(() => { });
export const AuthenticationStateContext = createContext<AuthenticationState>(new AuthenticationState(true, false));

export const DataManagerFrame: FunctionComponent = (props) => {

    //SET THEME
    setTheme(globalConfig.currentTheme);

    // fetch current user 
    const { currentUser, refetchUser, authState } = useUserFetching();
    console.log("Authentication state: " + authState.asString());

    // start auth pooling 
    useRenewUserSessionPooling();

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                <ChakraProvider>
                    {props.children}
                </ChakraProvider>
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element
}
