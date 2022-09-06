import {ClassType} from '../../src/services/misc/advancedTypes/ClassType';
import {respondError} from '../../src/startup/initTurboExpressListener';
import {throwNotImplemented} from '../../src/utilities/helpers';
import {ITurboExpressLayer} from '../../src/utilities/XTurboExpress/ITurboExpressLayer';
import {getControllerActionMetadatas} from '../../src/utilities/XTurboExpress/XTurboExpressDecorators';
import {
    ITurboRequest,
    ITurboResponse,
    IXTurboExpressListener,
    RegisterEndpointOptsType
} from '../../src/utilities/XTurboExpress/XTurboExpressTypes';

export type TestCookie = {
    key: string;
    value: string;
}

export type TestCallEndpointOptions<T = any> = {
    body?: any,
    query?: any,
    cookies?: TestCookie[],
    resultSignature?: ClassType<T>
};

export class TestTurboResponse<TData = any> implements ITurboResponse {

    public cookies: TestCookie[] = [];
    public response: { code: number; data: TData; };

    setCookie(key: string, value: string) {

        this.cookies = this.cookies.filter(x => x.key !== key);
        this.cookies.push({key, value});
    }

    getCookie(key: string) {

        return this.cookies.firstOrNull(x => x.key === key)?.value ?? null;
    }

    getCookieOrFail(key: string) {

        return this.cookies.single(x => x.key === key).value;
    }

    clearCookie() {

        throwNotImplemented();
    }

    respond(code: number, data?: any) {

        this.response = {code, data};
    }
}

export class TestListener implements IXTurboExpressListener {

    private _endpoints: RegisterEndpointOptsType<ITurboRequest, ITurboResponse>[] = [];

    constructor(private _throwError: boolean = false, private _logResError: boolean = false) {

    }

    registerEndpoint(opts: RegisterEndpointOptsType<any, any>): void {

        this._endpoints.push(opts);
    }

    listen(port: string, callback?: (() => void) | undefined): void {

        console.log('Test listener is listening...');
    }

    async callEndpoint<TController, TAction extends keyof TController, TResult = any>(
        controllerSignature: ITurboExpressLayer<TController>,
        action: TAction,
        opt: TestCallEndpointOptions<TResult>): Promise<TestTurboResponse<TResult>> {

        const metas = getControllerActionMetadatas(controllerSignature);
        const actionMeta = metas
            .single(x => x.propName === action);

        const endpoint = this
            ._endpoints
            .single(x => x.path === actionMeta.metadata.path);

        // test response
        const res = new TestTurboResponse();

        // test request
        const req: ITurboRequest = {
            body: opt.body ?? {},
            query: opt.query ?? {},
            files: {file: null},
            origin: '',
            getCookie: (key) => (opt.cookies ?? []).firstOrNull(x => x.key === key)?.value ?? null,
            getSingleFile: () => opt.query.params.files,
            hasFiles: () => false,
            path: endpoint.path,
        };

        try {

            const result = await endpoint
                .action(req, res);

            res.respond(200, result);
        } catch (e) {

            if (this._throwError)
                throw e;

            if (this._logResError) {

                console.error('----------------------- ACTION ERROR --------------------------');
                console.error(e);
            }

            respondError(res, e as any);
        }

        return res;
    }
}
