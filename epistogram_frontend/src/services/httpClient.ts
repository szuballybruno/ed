import axios from "axios";
import { globalConfig } from "../configuration/config";

export class HTTPResponse {
    code: number;
    data: any;

    constructor(code: number, data: any) {
        this.code = code;
        this.data = data;
    }
}

export const httpPostAsync = async (urlEnding: string, data?: any) => {

    const axiosResponse = await axios.post(globalConfig.backendUrl + urlEnding, data, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
}

export const httpGetAsync = async (urlEnding: string) => {

    const axiosResponse = await axios.get(globalConfig.backendUrl + urlEnding, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
}