import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { backendUrl } from "../Environemnt";
import { getErrorTypeByHTTPCode, TypedError } from "../frontendHelpers";
import HttpErrorResponseDTO from "../models/shared_models/HttpErrorResponseDTO";
import { LoadingStateType } from "../models/types";

export class HTTPResponse {
    code: number;
    data: any;

    constructor(code: number, data: any | HttpErrorResponseDTO) {
        this.code = code;
        this.data = data;
    }
}

const instance = (() => {

    const axiosInst = axios.create({
        // .. where we make our configurations
        baseURL: backendUrl
    });

    axiosInst.defaults.withCredentials = true

    axiosInst.defaults.headers = {
        'Content-Type': 'application/json'
    }

    return axiosInst;
})();

export const httpPostAsync = async (
    urlEnding: string,
    data?: any,
    configure?: (config: AxiosRequestConfig) => void) => {

    try {

        const config = {
            withCredentials: true
        } as AxiosRequestConfig;

        // set bearer token 
        if (configure) {

            configure(config);
        }

        const axiosResponse = await instance.post(urlEnding, data,);
        const response = new HTTPResponse(axiosResponse.status, axiosResponse.data);

        return response.data;
    } catch (error) {

        handleHttpError(error);
    }
}

export const httpGetAsync = async (urlEnding: string) => {

    try {
        const axiosResponse = await instance.get(urlEnding, {
            withCredentials: true
        });

        return new HTTPResponse(axiosResponse.status, axiosResponse.data).data;
    } catch (e) {

        handleHttpError(e);
    }
}

export const httpDeleteAsync = async (urlEnding: string) => {

    const axiosResponse = await instance.delete(urlEnding, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
}

export const usePostData = <TData, TResult>(url: string) => {

    const [state, setState] = useState<LoadingStateType>("success");
    const [error, setError] = useState<TypedError | null>(null);
    const [result, setResult] = useState<TResult | null>(null);

    const postDataAsync = async (data: TData) => {

        try {

            setState("loading");

            const postResult = await httpPostAsync(url, data);

            setState("success");
            setResult(postResult as TResult);
        }
        catch (e) {

            setState("error");
            setError(e as TypedError);
        }
    }

    const clearCache = () => {

        setResult(null);
    }

    return {
        postDataAsync,
        state,
        error,
        result,
        clearCache
    };
}

export const postFileAsync = async (url: string, file: File, data?: any) => {

    var formData = new FormData();
    formData.append('file', file);

    if (data) {

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {

                const value = data[key];
                formData.append(key, value);
            }
        }
    }

    await httpPostAsync(
        url,
        formData,
        x => x.headers = { ...x.headers, "Content-Type": 'multipart/form-data' });
}

export const addBearerToken = (config: AxiosRequestConfig, bearerToken: string) => {
    config.headers = {
        'Authorization': "Bearer " + bearerToken
    };
}

const handleHttpError = (error: any) => {

    // no response at all
    if (!error.response)
        throw error;

    const response = new HTTPResponse(error.response.status, error.response.data);
    const responseCode = response.code;

    if (responseCode != 200) {

        // get & check error response data
        const error = response.data as HttpErrorResponseDTO;
        if (!error)
            throw new TypedError(`Http response code (${responseCode}) did not indicate success.`, getErrorTypeByHTTPCode(responseCode));

        // get & check error response data properties
        if (!error.message && !error.errorType)
            throw new TypedError(`Http response code (${responseCode}) did not indicate success.`, getErrorTypeByHTTPCode(responseCode));

        // message only 
        // throw with a more informative message
        if (error.message && !error.errorType)
            throw new TypedError(`Http response code (${responseCode}) did not indicate success. Message: ${error.message}`, getErrorTypeByHTTPCode(responseCode));

        // error type and maybe message as well
        const message = error.message
            ? `Http response code (${responseCode}) did not indicate success. Message: ${error.message}`
            : `Http response code (${responseCode}) did not indicate success. Code: ${error.errorType}`

        // throw with a more informative message 
        // and error type
        throw new TypedError(message, error.errorType);
    }
}