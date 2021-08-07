import axios from "axios";
import { globalConfig } from "../configuration/config";

export const httpPost = (urlEnding: string, data: any) => {

    return axios.post(globalConfig.backendUrl + urlEnding, data, {
        withCredentials: true
    });
}

export const httpGet = (urlEnding: string) => {

    return axios.get(globalConfig.backendUrl + urlEnding, { withCredentials: true });
}