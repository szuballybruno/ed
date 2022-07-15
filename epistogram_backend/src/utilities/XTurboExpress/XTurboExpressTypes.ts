import { ActionParams } from './ActionParams';

export class AuthorizationResult {

    private constructor(
        public state: 'OK' | 'FAILED') {

    }

    static get ok() {

        return new AuthorizationResult('OK');
    }

    static get failed() {

        return new AuthorizationResult('FAILED');
    }
}

export type ControllerActionReturnType = { auth: () => Promise<AuthorizationResult>, action: () => Promise<any> };

export type XController<T> = {
    [K in keyof T]: (params: ActionParams) => ControllerActionReturnType | Promise<any>;
}