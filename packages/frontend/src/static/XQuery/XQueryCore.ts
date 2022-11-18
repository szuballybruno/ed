import { httpGetAsync } from '../../services/core/httpClient';
import { Logger } from '../Logger';
import { XQueryGlobalState } from './XQueryGlobalState';
import { GlobalQueryStateType, QueryEventData, QueryState } from './XQueryTypes';


export class XQueryCore<T> {

    private _idleState: QueryState<T | null> = {
        data: null,
        error: null,
        state: 'idle'
    };

    constructor(
        private _url,
        private _onChange: () => void,
        private _execOnQueryEvent: (data: QueryEventData) => void) {
    }

    tryQuery(query: any, isEnabled?: boolean): QueryState<T | null> {

        const url = this._url;

        const queryRes = (() => {

            Logger.logScoped('QUERY', `[${url}] Querying begin...`);

            // get state from global store 
            const cachedState = XQueryGlobalState
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

                Logger.logScoped('QUERY', `-- [${url}] Query is not enabled.`);

                return this._idleState;
            }

            /**
             * Never set cache - meaning query is still in IDLE state
             */
            if (!cachedState) {

                this.fetchAsync(newQueryParams, queryingEnabled);
                return this._idleState;
            }

            /**
             * If has been queried before, but querying again, 
             * and is currently loading, 
             * return last cahced state
             */
            if (cachedState?.qr?.state === 'loading') {

                Logger.logScoped('QUERY', `-- [${url}] Query is already in loading state.`);
                return cachedState.qr;
            }

            /**
             * Check if old cache is still valid 
             */
            if (!this._isCacheValid(url, newQueryParams, cachedState.params)) {

                // fetch data
                this.fetchAsync(newQueryParams, isEnabled);
            }

            /**
             * No exceptional state has been found, 
             * returning last cached data
             */
            Logger.logScoped('QUERY', `-- [${url}] Old data is still valid. `);
            return cachedState.qr;
        })();

        Logger.logScoped('QUERY', `-- [${url}] Result: ${queryRes.data === null ? 'null' : ''}`, queryRes.data);

        return queryRes;
    }

    async fetchAsync(queryObject: any, isEnabled?: boolean) {

        const url = this._url;

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `-- [${url}] Query is not enabled.`);
            return;
        }

        // get state from global store 
        const state = XQueryGlobalState
            .getState(url);

        Logger.logScoped('QUERY', `-- [${url}] Fetching...`);

        this._setGlobalState(url, {
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

            this._setGlobalState(url, {
                params: queryObject,
                qr: {
                    state: 'success',
                    error: null,
                    data: data
                }
            });
        }
        catch (e: any) {

            this._setGlobalState(url, {
                params: queryObject,
                qr: {
                    state: 'error',
                    error: e,
                    data: null
                }
            });
        }
    }

    private _isCacheValid(url: string, newQueryParams: any, cachedQueryParams: any): boolean {

        // Logger.logScoped('QUERY', `-- Comparing new/cahced query params: ${JSON.stringify(newQueryParams)} - ${JSON.stringify(cachedQueryParams)}`);

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

    private _setGlobalState(url: string, newState: GlobalQueryStateType) {

        // set new state
        XQueryGlobalState
            .setState(url, newState);

        // call events
        this._onChange();
        this._execOnQueryEvent({ ...newState.qr, route: url });
    }
}