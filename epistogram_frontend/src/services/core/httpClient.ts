import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { serverUrl } from "../../static/Environemnt";
import { getErrorTypeByHTTPCode, getUrl, stringifyQueryObject, TypedError } from "../../static/frontendHelpers";
import HttpErrorResponseDTO from "../../models/shared_models/HttpErrorResponseDTO";
import { LoadingStateType } from "../../models/types";

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
        baseURL: serverUrl
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
    configure?: (config: AxiosRequestConfig) => void,
    queryObject?: any) => {

    try {

        const config = {
            withCredentials: true
        } as AxiosRequestConfig;

        // set bearer token
        if (configure) {

            configure(config);
        }

        const url = getUrl(urlEnding, undefined, queryObject);
        const axiosResponse = await instance.post(url, data);
        const response = new HTTPResponse(axiosResponse.status, axiosResponse.data);

        return response.data;
    } catch (error) {

        handleHttpError(error);
    }
}

export const httpGetAsync = async (urlEnding: string, queryObject?: any) => {

    try {

        const url = getUrl(urlEnding, undefined, queryObject);

        const axiosResponse = await instance.get(url, {
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

export const usePostDataUnsafe = <TData, TResult>(url: string) => {

    const [state, setState] = useState<LoadingStateType>("idle");
    const [result, setResult] = useState<TResult | null>(null);

    const postDataAsync = async (data?: TData, file?: File, queryObject?: any) => {

        try {

            setState("loading");

            const postData = data ? data : undefined;
            const postResult = file
                ? await postFileAsync(url, file, data) as TResult
                : await httpPostAsync(url, postData, undefined, queryObject) as TResult;

            setState("idle");
            setResult(postResult);

            return postResult;
        }
        catch (e) {

            setState("idle");
            throw e;
        }
    }

    const clearCache = () => {

        setResult(null);
        setState("idle");
    }

    return {
        postDataAsync,
        state,
        result,
        clearCache
    };
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

export const usePostFile = (url: string) => {

    const [state, setState] = useState<LoadingStateType>("idle");

    return {
        postFileAsync: async (file: File) => {

            try {

                setState("loading");

                await postFileAsync(url, file);

                setState("idle");
            }
            catch (e) {

                setState("idle");
                throw e;
            }
        },
        state
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

    return await httpPostAsync(
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

    if (responseCode === 503) // under maintanence
    {
        window.location.href = window.location.origin + applicationRoutes.underMaintanenceRoute.route;
    }

    if (responseCode !== 200) {

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