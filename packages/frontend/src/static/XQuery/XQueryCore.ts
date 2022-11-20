import { httpGetAsync } from '../../services/core/httpClient';
import { Logger } from '../Logger';
import { GlobalQueryStateType, OnChangeListenerType, QueryStateType } from './XQueryTypes';

const idleState: QueryStateType = {
    data: null,
    error: null,
    state: 'idle'
};

export class XQueryCore<T> {

    static globalStates: { [K: string]: GlobalQueryStateType } = {};
    static onChangeListeners: [string, OnChangeListenerType][] = [];

    static setState(state: GlobalQueryStateType) {

        Logger.logScoped('QUERY', `-- state changed to: ${state.qr.state}!`);

        XQueryCore
            .globalStates[state.url] = state;

        XQueryCore
            .onChangeListeners
            .filter(x => x[0] === state.url)
            .forEach(x => x[1](state));
    }

    static getState(url: string) {

        return XQueryCore
            .globalStates[url] ?? idleState;
    }

    private _onChangeCallback: OnChangeListenerType | null = null;
    private _subscriptionFn: OnChangeListenerType | null = null;

    constructor(url) {

        this._subscriptionFn = this
            ._executeOnChange
            .bind(this);

        XQueryCore
            .onChangeListeners
            .push([url, this._subscriptionFn]);
    }

    tryQuery(
        url: string,
        query: any,
        isEnabled?: boolean): void {

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
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            // Logger.logScoped('QUERY', `-- [${url}] Query is not enabled.`);
            return;
        }

        /**
         * Never set cache - meaning query is still in IDLE state
         */
        if (!state) {

            Logger.logScoped('QUERY', `-- [${url}] Cache not found, fetching...`);
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

            Logger.logScoped('QUERY', `-- [${url}] Cache is invalid, fetching...`);
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
        url: string,
        queryObject: any,
        isEnabled?: boolean) {

        const setState = (newState: GlobalQueryStateType) => XQueryCore
            .setState(newState);

        const state = XQueryCore
            .getState(url);

        await this
            ._fetchAsync({
                state,
                setState,
                url,
                queryObject,
                isEnabled
            });
    }

    setOnChangeCallback(onChange: (state: GlobalQueryStateType) => void) {

        this._onChangeCallback = onChange;
    }

    destroy() {

        this._onChangeCallback = null;

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

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `-- [${url}] Query is not enabled.`);
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

        if (this._onChangeCallback)
            this._onChangeCallback(state);
    }

    private _isCacheValid(url: string, newQueryParams: any, cachedQueryParams: any): boolean {

        if (!cachedQueryParams)
            return false;

        const unequalKeys = Object
            .keys(newQueryParams)
            .filter(key => {

                return cachedQueryParams[key] !== newQueryParams[key];
            });

        if (unequalKeys.length > 0) {

            Logger.logScoped('QUERY', `-- [${url}] ` + unequalKeys
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