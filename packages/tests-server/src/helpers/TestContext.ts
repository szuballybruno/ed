import { apiRoutes } from "@episto/communication";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { domain } from "./config";

type ApiRoutesType = typeof apiRoutes;
type RequestOptions = { origin?: string, cookie?: string };
type GetRouteFn = (routes: ApiRoutesType) => string;

export type TestContextDefaults = {
    environmentName: string,
    applyDefaultConfig: (defaults: typeof axios.defaults) => void
};

export class TestContext {

    private _opts: RequestOptions = {};

    constructor(private _contextDefaults: TestContextDefaults) {

    }

    overwriteRequestDefaults(opts: RequestOptions) {

        this._opts = {
            ...this._opts,
            ...opts
        };

        return this;
    }

    setAuthToken(token: string) {

        this.overwriteRequestDefaults({
            cookie: `epi_access_token_${this._contextDefaults.environmentName}=${token}`
        });

        return this;
    }

    async fetchAsync(getRoute: GetRouteFn, query: any) {

        const route = `${domain}${getRoute(apiRoutes)}`;
        const headers = this._setHeaderOptions({}, this._opts);

        return this._axiosCallAsync(route, {
            params: query,
            headers
        });
    }

    async postAsync<TBody = any>(getRoute: GetRouteFn, body: TBody) {

        const route = `${domain}${getRoute(apiRoutes)}`;
        const json = body ? JSON.stringify(body) : undefined;

        const headers = this._setHeaderOptions({
            'Content-Type': 'application/json'
        }, this._opts);

        return this._axiosCallAsync(route, {
            method: 'POST',
            data: json,
            headers
        });
    }

    async _axiosCallAsync(route: string, opts: AxiosRequestConfig) {

        try {

            // apply default 
            this
                ._contextDefaults
                .applyDefaultConfig(axios.defaults);

            const response = opts.method === "POST"
                ? await axios.post(route, opts.data, opts)
                : await axios.get(route, opts);

            return response;
        }
        catch (error: any) {

            const axError = error as AxiosError;
            const axErrorMessage = `AxiosError: Code: ${axError.code} Msg: ${axError.message} Status: ${axError.response?.status} Status msg: ${axError.response?.statusText}`
            const newError = new Error(axErrorMessage);

            newError['axiosError'] = axError;

            throw newError;
        }
    }

    _setHeaderOptions(headers: any, options?: RequestOptions) {

        if (options?.origin)
            headers['Origin'] = options.origin;

        if (options?.cookie)
            headers['Cookie'] = options.cookie;

        return headers;
    }
}