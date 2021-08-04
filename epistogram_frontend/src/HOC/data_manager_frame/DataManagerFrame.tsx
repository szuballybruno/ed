import {FunctionComponent, useEffect} from "react";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../store/application/applicationRunningState";
import userSideState from "../../store/user/userSideState";
//import {hotjar} from "react-hotjar";
import setTheme from "../../services/setTheme";
import {config} from "../../configuration/config";
import {AxiosRequestConfig} from "axios";
import instance from "../../services/axiosInstance";
import Cookies from "universal-cookie";

export const DataManagerFrame: FunctionComponent = (props) => {
    const cookies = new Cookies();
    //STATES
    const user = useState(userSideState)
    const app = useState(applicationRunningState)

    //DATA COLLECTOR SCRIPTS
    //hotjar.initialize(1954004, 0);

    //SET THEME
    setTheme(config.currentTheme);

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
    return props.children as JSX.Element
}
