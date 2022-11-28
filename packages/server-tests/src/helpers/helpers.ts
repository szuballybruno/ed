import { apiRoutes } from "@episto/communication";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { domain } from "./config";

type ApiRoutesType = typeof apiRoutes;
type CallOptions = { origin?: string };

const axiosCallAsync = async (route: string, opts: AxiosRequestConfig) => {

    try {

        const response = opts.method === "POST"
            ? await axios.post(route, opts.data, opts)
            : await axios.get(route, opts);

        return response;
    }
    catch (error: any) {

        const axError = error as AxiosError;
        const axErrorMessage = `AxiosError: Code: ${axError.code} Msg: ${axError.message} Status: ${axError.response?.status} Status msg: ${axError.response?.statusText}`

        throw new Error(axErrorMessage);
    }
}

const fetchAsync = async (getRoute: (routes: ApiRoutesType) => string, query: any, options?: CallOptions) => {

    const route = `${domain}${getRoute(apiRoutes)}`;

    return axiosCallAsync(route, {
        params: query,
        headers: options?.origin
            ? {
                'Origin': options.origin
            }
            : undefined
    });
}

const postAsync = (getRoute: (routes: ApiRoutesType) => string, body: any, options?: CallOptions) => {

    const route = `${domain}${getRoute(apiRoutes)}`;
    const json = body ? JSON.stringify(body) : undefined;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (options?.origin)
        headers['Origin'] = options.origin;

    return axiosCallAsync(route, {
        method: 'POST',
        data: json,
        headers
    });
}

const throwIf = (condition: boolean) => {

    if (!condition)
        return;

    throw new Error(`Test failed.`);
}

export const Helpers = {
    fetchAsync,
    postAsync,
    throwIf
}