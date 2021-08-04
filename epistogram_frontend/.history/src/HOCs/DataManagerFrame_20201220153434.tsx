import {FunctionComponent, useEffect} from "react";
import {useState} from "@hookstate/core";
import applicationRunningState from "../globalStates/applicationRunningState";
import userSideState from "../globalStates/userSideState";
import {hotjar} from "react-hotjar";
import setTheme from "../helpers/setTheme";
import {config} from "../configuration/config";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import instance from "../helpers/axiosInstance";
import Cookies from "universal-cookie";

export const DataManagerFrame: FunctionComponent = (props) => {
    const cookies = new Cookies();
    console.warn("[DataManagerFrame] Started...")
    //STATES
    const user = useState(userSideState)
    const app = useState(applicationRunningState)

    //DATA COLLECTOR SCRIPTS
    hotjar.initialize(1954004, 0);

    //SET THEME
    setTheme(config.currentTheme);

    //LOADING INDICATOR METHODS
    const setLoadingOnRequest = (config: AxiosRequestConfig) => {
        app.loadingIndicator.set("loading")
        return config
    }

    const setLoadingOnResponse = (response: AxiosResponse) => {
        if (response) {
            app.loadingIndicator.set("succeeded")
        } else {
            app.loadingIndicator.set("failed")
        }
        return response
    }

    //FIRST SCRIPTS ON THE PAGE
    useEffect(() => {
        console.log("[USEEFFECT]")
        const requestInterceptor =  instance.interceptors.request.use(setLoadingOnRequest)
        const responseInterceptor = instance.interceptors.response.use(setLoadingOnResponse)

        instance.get("users/getuser?userId=" + cookies.get("userId")).then((res) => {
            console.log("Ez a res.data: " + JSON.stringify(res.data))
            if (res.data) {
                user.set(res.data)
                /*instance.get("/courses/getcourse?_id="+ user.user.userData.currentCourseId.get()).then((res) => {
                    user.course.set(res.data)
                    instance.get("/videos/getvideos?courseId="+ user.user.userData.currentCourseId.get()).then((res) => {
                        console.log("Ez a videos resp" + res.data)
                        user.videos.set(res.data)

                        //TODO Befetchelni a jelenlegi kurzust is, nem csak a videót
                        user.user.userData.currentVideoId.set(JSON.parse(JSON.stringify(user.videos[0].get())));
                        user.video.set(JSON.parse(JSON.stringify(user.videos[0].get())))
                        return app.currentSeekSliderValue.set(0)

                    }).catch((e) => {
                        return e
                    })
                }).catch((e) => {
                    return e
                })*/
                app.loadingIndicator.set("succeeded")
            } else {
                app.loadingIndicator.set("failed")
            }
        }).catch((e) => {
            return e
        })

        instance.interceptors.request.eject(requestInterceptor)
        instance.interceptors.response.eject(responseInterceptor)


    },[app.isLoggedIn.get()])
    return props.children as JSX.Element
}