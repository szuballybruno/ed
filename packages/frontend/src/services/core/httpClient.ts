import { ErrorWithCode } from '@episto/commontypes';
import { HttpErrorResponseDTO, ParametrizedRouteType, RouteParameterType } from '@episto/communication';
import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { LoadingStateType } from '../../models/types';
import { Environment } from '../../static/Environemnt';
import { getErrorTypeByHTTPCode, getUrl } from '../../static/frontendHelpers';

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

export const httpPostAsync = async ({
    urlEnding,
    configure,
    data,
    queryObject
}: {
    urlEnding: string,
    data?: any,
    configure?: (baseConfig: AxiosRequestConfig) => AxiosRequestConfig,
    queryObject?: any
}) => {

    try {

        const baseConfig: AxiosRequestConfig = {
            withCredentials: true,
            baseURL: Environment.serverUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const config = configure
            ? configure(baseConfig)
            : baseConfig;

        const url = getUrl(urlEnding, undefined, queryObject);
        const axiosResponse = await axios.post(url, data, config);
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
 */
export const usePostDataUnsafe = <TData = any, TResult = void>(url: string | ParametrizedRouteType<RouteParameterType<TData, any>>) => {

    const [state, setState] = useState<LoadingStateType>('idle');
    const [result, setResult] = useState<TResult | null>(null);

    const postDataAsync = useCallback(async (data?: TData) => {

        try {

            setState('loading');

            const postData = data ? data : undefined;
            const postResult = await httpPostAsync({
                urlEnding: url,
                data: postData,
                configure: undefined,
                queryObject: undefined
            }) as TResult;

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
 */
export const usePostMultipartDataUnsafe = <TData>(url: string | ParametrizedRouteType<RouteParameterType<TData, any>>) => {

    const [state, setState] = useState<LoadingStateType>('idle');

    const postMultipartDataAsync = useCallback(async ({ data, files }: { data?: TData, files?: FilesObject }) => {

        try {

            setState('loading');

            await postMultipartAsync(url, files, data);

            setState('idle');
        }
        catch (e) {

            setState('error');
            throw e;
        }
    }, [url]);

    return {
        postMultipartDataAsync,
        state
    };
};

type FilesObject = {
    [K: string]: File | null;
}

/**
 * Post multipart form data. 
 * This allows sending files to the server, and also a data object as json.
 */
export const postMultipartAsync = async (url: string, files?: FilesObject, data?: any) => {

    let formKeyDatas = [] as { key: string, data: any }[];

    // append file data
    if (files) {

        const fileKeyDatas = Object
            .keys(files)
            .map(key => ({ key, data: files[key] }))
            .filter(kd => !!kd.data);

        formKeyDatas = formKeyDatas
            .concat(fileKeyDatas);
    }

    // append json data 
    if (data) {

        const jsonData = JSON.stringify(data);
        formKeyDatas = formKeyDatas
            .concat([{ key: 'document', data: jsonData }]);
    }

    const formData = new FormData();

    formKeyDatas
        .forEach(kd => formData
            .append(kd.key, kd.data));

    return await httpPostAsync({
        urlEnding: url,
        data: formData,
        configure: baseConfig => {

            if (baseConfig.headers)
                baseConfig.headers['Content-Type'] = 'multipart/form-data';

            return baseConfig;
        }
    });
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
            throw new ErrorWithCode(`Http response code (${responseCode}) did not indicate success.`, getErrorTypeByHTTPCode(responseCode));

        // get & check error response data properties
        if (!error.message && !error.code)
            throw new ErrorWithCode(`Http response code (${responseCode}) did not indicate success.`, getErrorTypeByHTTPCode(responseCode));

        // message only
        // throw with a more informative message
        if (error.message && !error.code)
            throw new ErrorWithCode(`Http response code (${responseCode}) did not indicate success. Message: ${error.message}`, getErrorTypeByHTTPCode(responseCode));

        // error type and maybe message as well
        const message = error.message
            ? `Http response code (${responseCode}) did not indicate success. Message: ${error.message}`
            : `Http response code (${responseCode}) did not indicate success. Code: ${error.code}`;

        // throw with a more informative message
        // and error type
        throw new ErrorWithCode(message, error.code);
    }
};
