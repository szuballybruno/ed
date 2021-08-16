import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import { AdminPageUserView } from "../models/shared_models/AdminPageUserDTO";
import { IdType } from "../models/shared_models/types/sharedTypes";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { IUserDetails } from "../store/user/UserSideStateIF";
import { httpGetAsync } from "./httpClient";

export const useUserId = () => {

    const cookies = new Cookies();
    const userId = cookies.get("userId");

    return userId ? userId as number : null;
}

//onLoadingStateChanged: (loadingState: LoadingState) => void
export const useGetUserDetails = (userId: IdType | null) => {

    //STATES
    // var loadingState = "loading" as LoadingStateType;
    // var userDetails = null as IUserDetails | null;

    //LOADING INDICATOR METHODS
    // const setLoadingOnRequest = (config: AxiosRequestConfig) => {
    //     loadingState = "loading"
    //     return config
    // }

    // useEffect(() => {

    //     // do not query user data if user id is null
    //     if (!userId)
    //         return;

    //     const requestInterceptor = instance.interceptors.request.use(setLoadingOnRequest)
    //     //TODO: Normális error handling
    //     instance.get(`users/${userId}`).then((res) => {
    //         if (res.data) {
    //             userDetails = (res.data)
    //             loadingState = "success"
    //         } else {
    //             loadingState = "failed"
    //         }
    //     }).catch((e) => {
    //         //app.loadingIndicator.set("failed")
    //         loadingState = "failed"
    //         return e
    //     })

    //     instance.interceptors.request.eject(requestInterceptor)

    //     // eslint-disable-next-line
    // }, [userId])

    const url = `users/${userId}`;
    const { data: userDetails, status } = useQuery(
        [
            'getUserDetails',
            userId
        ],
        async () => (await httpGetAsync(url)).data as IUserDetails, {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!userId
    });

    return {
        userDetails,
        status: status as LoadingStateType
    };
}