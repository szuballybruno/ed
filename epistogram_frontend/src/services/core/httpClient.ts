import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Environment } from '../../static/Environemnt';
import { getErrorTypeByHTTPCode, getUrl } from '../../static/frontendHelpers';
import HttpErrorResponseDTO from '../../shared/dtos/HttpErrorResponseDTO';
import { LoadingStateType } from '../../models/types';
import { VerboseError } from '../../shared/types/VerboseError';

export class HTTPResponse {
    code: number;
    data: any;

    constructor(code: number, data: any | HttpErrorResponseDTO) {
        this.code = code;
        this.data = data;
    }
}

const instance = (() => {

    const axiosInst = axios
        .create({
            baseURL: Environment.serverUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    axiosInst.defaults.withCredentials = true;

    // axiosInst.defaults.headers = {
    //     post:
    //         'Content-Type': 'application/json'
    // };

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
};

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
};

export const httpDeleteAsync = async (urlEnding: string) => {

    const axiosResponse = await instance.delete(urlEnding, {
        withCredentials: true
    });

    return new HTTPResponse(axiosResponse.status, axiosResponse.data);
};

/**
 * Post a json payload, without implicitly handling errors, 
 * meaning exceptions will bubble up, and must be handled by the caller funciton.
 * 
 * @param url 
 * @returns 
 */
export const usePostDataUnsafe = <TData = any, TResult = void>(url: string) => {

    const [state, setState] = useState<LoadingStateType>('idle');
    const [result, setResult] = useState<TResult | null>(null);

    const postDataAsync = useCallback(async (data?: TData) => {

        try {

            setState('loading');

            const postData = data ? data : undefined;
            const postResult = await httpPostAsync(url, postData, undefined, undefined) as TResult;

            setState('idle');
            setResult(postResult);

            return postResult;
        }
        catch (e) {

            setState('idle');
            throw e;
        }
    }, [setState, setResult]);

    const clearCache = useCallback(() => {

        setResult(null);
        setState('idle');
    }, [setState, setResult]);

    return {
        postDataAsync,
        state,
        result,
        clearCache
    };
};

/**
 * Post a multipart payload, containing a file, 
 * and or a data object as a json document.
 * This is also unsafe, as in errors are not handled implicitly.
 * 
 * @param url 
 * @returns 
 */
export const usePostMultipartDataUnsafe = <TData>(url: string) => {

    const [state, setState] = useState<LoadingStateType>('idle');

    const postMultipartDataAsync = async (data?: TData, file?: File) => {

        try {

            setState('loading');

            await postMultipartAsync(url, file, data);

            setState('idle');
        }
        catch (e) {

            setState('idle');
            throw e;
        }
    };

    return {
        postMultipartDataAsync,
        state
    };
};

/**
 * Post a json payload, and implicitly handle errors, 
 * which will be set to the error output const. 
 * State is set accordingly. 
 * 
 * @param url 
 * @returns 
 */
export const usePostData = <TData, TResult>(url: string) => {

    const [state, setState] = useState<LoadingStateType>('success');
    const [error, setError] = useState<VerboseError | null>(null);
    const [result, setResult] = useState<TResult | null>(null);

    const postDataAsync = async (data: TData) => {

        try {

            setState('loading');

            const postResult = await httpPostAsync(url, data);

            setState('success');
            setResult(postResult as TResult);
        }
        catch (e) {

            setState('error');
            setError(e as VerboseError);
        }
    };

    const clearCache = () => {

        setResult(null);
    };

    return {
        postDataAsync,
        state,
        error,
        result,
        clearCache
    };
};

/**
 * Post multipart form data. 
 * This allows sending files to the server, and also a data object as json.
 * 
 * @param url 
 * @param file 
 * @param data 
 * @returns 
 */
export const postMultipartAsync = async (url: string, file?: File, data?: any) => {

    const formData = new FormData();

    // append file data
    if (file) {

        formData.append('file', file);
    }

    // append json data 
    if (data) {

        const jsonData = JSON.stringify(data);
        formData.append('document', jsonData);
    }

    return await httpPostAsync(
        url,
        formData,
        x => x.headers = { ...x.headers, 'Content-Type': 'multipart/form-data' });
};

export const addBearerToken = (config: AxiosRequestConfig, bearerToken: string) => {
    config.headers = {
        'Authorization': 'Bearer ' + bearerToken
    };
};

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
            throw new VerboseError(`Http response code (${responseCode}) did not indicate success.`, getErrorTypeByHTTPCode(responseCode));

        // get & check error response data properties
        if (!error.message && !error.code)
            throw new VerboseError(`Http response code (${responseCode}) did not indicate success.`, getErrorTypeByHTTPCode(responseCode));

        // message only
        // throw with a more informative message
        if (error.message && !error.code)
            throw new VerboseError(`Http response code (${responseCode}) did not indicate success. Message: ${error.message}`, getErrorTypeByHTTPCode(responseCode));

        // error type and maybe message as well
        const message = error.message
            ? `Http response code (${responseCode}) did not indicate success. Message: ${error.message}`
            : `Http response code (${responseCode}) did not indicate success. Code: ${error.code}`;

        // throw with a more informative message
        // and error type
        throw new VerboseError(message, error.code);
    }
};
