import axios from "axios";
import { globalConfig } from "../configuration/config";
import instance from "./axiosInstance";

export class HTTPResponse {
    code: number;
    data: any;

    constructor(code: number, data: any) {
        this.code = code;
        this.data = data;
    }
}

export const httpPostAsync = async (urlEnding: string, data?: any) => {

    const axiosResponse = await instance.post(urlEnding, data, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
}

export const httpGetAsync = async (urlEnding: string) => {

    const axiosResponse = await instance.get(urlEnding, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
}

export const httpDeleteAsync = async (urlEnding: string) => {

    const axiosResponse = await instance.delete(urlEnding, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
}