import { httpGetAsync } from '../../services/core/httpClient';
import { Logger } from '../Logger';
import { ObjectComparer } from '../objectComparer';
import { GlobalQueryStateType, OnChangeListenerType } from './XQueryTypes';

const getIdleState = (url: string): GlobalQueryStateType => ({
    qr: {
        data: null,
        error: null,
        state: 'idle'
    },
    params: null,
    url
});

export class XQueryCore<T> {

    static globalStates: { [K: string]: GlobalQueryStateType } = {};
    static onChangeListeners: [string, OnChangeListenerType][] = [];

    static setState(state: GlobalQueryStateType) {

        Logger.logScoped('QUERY', `[${state.url}] State changed to: ${state.qr.state}!`, state.qr.data);

        XQueryCore
            .globalStates[state.url] = state;

        XQueryCore
            .onChangeListeners
            .filter(x => x[0] === state.url)
            .forEach(x => x[1](state));
    }

    static getState(url: string) {

        return XQueryCore
            .globalStates[url] ?? getIdleState(url);
    }

    private _subscriptionFn: OnChangeListenerType | null = null;

    constructor(private _url, private _onChangeCallback: OnChangeListenerType) {

        this._subscriptionFn = this
            ._executeOnChange
            .bind(this);

        XQueryCore
            .onChangeListeners
            .push([this._url, this._subscriptionFn]);
    }

    tryQuery(
        query: any,
        isEnabled?: boolean): void {

        const url = this._url;

        const queryingEnabled = isEnabled === false
            ? false
            : true;

        const setState = (newState: GlobalQueryStateType) => XQueryCore
            .setState(newState);

        const state = XQueryCore
            .getState(url);

        // process query object 
        const newQueryParams = this
            ._processQueryObj(query);

        /**
         * If querying is disabled 
         * return last state or idle 
         */
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `[${url}] Query is not enabled.`);
            return;
        }

        /**
         * Never set cache - meaning query is still in IDLE state
         */
        if (!state) {

            Logger.logScoped('QUERY', `[${url}] Cache not found, fetching...`);
            this._fetchAsync({
                state,
                setState,
                url,
                isEnabled,
                queryObject: newQueryParams
            });
            return;
        }

        /**
         * If has been queried before, but querying again, 
         * and is currently loading, 
         * return last cached state
         * -- if tying to query multiple times at once, do nothing 
         */
        if (state?.qr?.state === 'loading') {

            // Logger.logScoped('QUERY', `-- [${url}] Query is already in loading state.`);
            return;
        }

        /**
         * Check if old cache is still valid 
         * -- if old cache is not valid, fetch!
         */
        if (!this._isCacheValid(url, newQueryParams, state.params)) {

            Logger.logScoped('QUERY', `[${url}] Cache is invalid, fetching...`);
            this._fetchAsync({
                state,
                setState,
                url,
                isEnabled,
                queryObject: newQueryParams
            });
            return;
        }
    }

    async refetchAsync(
        queryObject: any,
        isEnabled?: boolean) {

        const setState = (newState: GlobalQueryStateType) => XQueryCore
            .setState(newState);

        const state = XQueryCore
            .getState(this._url);

        await this
            ._fetchAsync({
                state,
                setState,
                url: this._url,
                queryObject,
                isEnabled
            });
    }

    destroy() {

        XQueryCore
            .onChangeListeners = XQueryCore
                .onChangeListeners
                .filter(x => x[1] !== this._subscriptionFn);
    }

    private async _fetchAsync({
        queryObject,
        setState,
        state,
        url,
        isEnabled
    }: {
        state: GlobalQueryStateType,
        setState: (state: GlobalQueryStateType) => void,
        url: string,
        queryObject: any,
        isEnabled?: boolean
    }) {

        Logger.logScoped('QUERY', `Fetching ${url}...`, queryObject);

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `[${url}] Query is not enabled.`);
            return;
        }

        setState({
            url,
            params: queryObject,
            qr: {
                state: 'loading',
                error: null,
                data: state?.qr?.data ?? null
            }
        });

        try {

            // fetch data
            const data = await httpGetAsync(url, queryObject);

            setState({
                url,
                params: queryObject,
                qr: {
                    state: 'success',
                    error: null,
                    data: data
                }
            });
        }
        catch (e: any) {

            setState({
                url,
                params: queryObject,
                qr: {
                    state: 'error',
                    error: e,
                    data: null
                }
            });
        }
    }

    private _executeOnChange(state: GlobalQueryStateType) {

        if (!this._onChangeCallback)
            throw new Error(`On changed callback is not yet set! Url: ${state.url}`);

        this._onChangeCallback(state);
    }

    private _isCacheValid(url: string, newQueryParams: any, cachedQueryParams: {} | null): boolean {

        if (cachedQueryParams === null) {

            Logger.logScoped('QUERY', 'Cache invalid, not yet set.');
            return false;
        }

        const changedProps = ObjectComparer
            .compareObjects(cachedQueryParams, newQueryParams);

        // const unequalKeys = Object
        //     .keys(newQueryParams)
        //     .filter(key => {

        //         return cachedQueryParamsArray[key] !== newQueryParams[key];
        //     });

        if (changedProps.length > 0) {

            Logger.logScoped('QUERY', `[${url}] ` + changedProps
                .map(key => `Cache key (${key}) value mismatch: ${JSON.stringify(cachedQueryParams[key])} <> ${JSON.stringify(newQueryParams[key])}`)
                .join('\n'));

            return false;
        }

        return true;
    }

    private _processQueryObj(query: any) {

        if (!query)
            return {};

        const obj = {} as any;
        Object
            .keys(query)
            .filter(key => query[key] !== undefined)
            .forEach(key => obj[key] = query[key]);

        return obj;
    }
}