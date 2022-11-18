import { Logger } from '../Logger';
import { GlobalQueryStateType } from './XQueryTypes';

export class XQueryGlobalState {

    static globalState: { [K: string]: GlobalQueryStateType } = {};

    static getState(url: string) {

        // get item, and validate by key
        const state = this.globalState[url];
        if (!state) {

            return null;
        }

        return state;
    };

    static setState(url: string, state: GlobalQueryStateType) {

        Logger.logScoped('QUERY', `-- [${url}] Setting global state - ${state.qr.state} - ${JSON.stringify(state.params)}...`);
        this.globalState[url] = state;
    };
}