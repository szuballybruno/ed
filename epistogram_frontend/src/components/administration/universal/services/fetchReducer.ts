import {AxiosResponse} from "axios";
import instance from "../../../../services/axiosInstance";

export const fetchReducer = (endpoint: string, callback: (res: AxiosResponse) => void) => {
    instance.get( endpoint).then((res) => {
        if (res.status === 200) {
            callback(res)
        } else {
            console.log("fasd")
        }

    }).catch((e) => {
        console.log(e)
    })
}