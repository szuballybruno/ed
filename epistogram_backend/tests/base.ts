import { SQLConnectionService } from '../src/services/sqlServices/SQLConnectionService';
import { initServiceProvider } from '../src/startup/initApp';
import { initTurboExpress } from '../src/startup/instatiateTurboExpress';
import { ServiceProvider } from '../src/startup/servicesDI';
import { throwNotImplemented } from '../src/utilities/helpers';
import { ITurboExpressLayer } from '../src/utilities/XTurboExpress/ITurboExpressLayer';
import { getControllerActionMetadatas } from '../src/utilities/XTurboExpress/XTurboExpressDecorators';
import { ITurboRequest, ITurboResponse, IXTurboExpressListener, RegisterEndpointOptsType } from '../src/utilities/XTurboExpress/XTurboExpressTypes';

type InitData = {
    serviceProvider: ServiceProvider,
    listener: TestListener
}

type TestCookie = {
    key: string;
    value: string;
}

type TestCallEndpointOptions = {
    body?: any,
    query?: any,
    cookies?: TestCookie[],
    onSetCookie?: (key: string, value: string) => void
};

class TestListener implements IXTurboExpressListener {

    private _endpoints: RegisterEndpointOptsType<ITurboRequest, ITurboResponse>[] = [];

    constructor() {

    }

    registerEndpoint(opts: RegisterEndpointOptsType<any, any>): void {

        this._endpoints.push(opts);
    }

    listen(port: string, callback?: (() => void) | undefined): void {

        console.log('Test listener is listening...');
    }

    callEndpoint<TController>(
        controller: ITurboExpressLayer<TController>,
        action: keyof TController,
        opt: TestCallEndpointOptions) {

        const metas = getControllerActionMetadatas(controller);
        const actionMeta = metas
            .single(x => x.propName === action);

        const endpoint = this
            ._endpoints
            .single(x => x.path === actionMeta.metadata.path);

        // test response 
        let response: any = null;
        const res: ITurboResponse = {
            clearCookie: () => { },
            respond: (code, data) => response = { code, data },
            setCookie: () => { }
        };

        // test request 
        const req: ITurboRequest = {
            body: opt.body,
            query: opt.query,
            files: [],
            getBearerToken: () => (opt.cookies ?? []).single(x => x.key === 'bearerToken').value,
            getCookie: (key) => (opt.cookies ?? []).firstOrNull(x => x.key === key)?.value ?? null,
            getSingleFile: () => throwNotImplemented(),
            hasFiles: () => throwNotImplemented(),
            path: endpoint.path,
        };

        endpoint
            .syncAction(req, res);

        return response;
    }
}

export const setupTest = (tests: (getInitData: () => InitData) => void) => {

    const { getServiceProviderAsync, singletonServiceProvider } = initServiceProvider('');
    const listener = new TestListener();
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync, listener);
    const initDataContainer: { initData: InitData } = {} as any;
    const getInitData = () => initDataContainer.initData;

    /**
     * --------------------- Init tests
     */
    describe('init tests', () => {
        it('should init tests', async () => {

            // create init data
            initDataContainer.initData = {
                serviceProvider: await getServiceProviderAsync(),
                listener
            };
        });
    });

    tests(getInitData);

    /**
     * ----------------------- Destruct tests
     */
    describe('Destruct tests', () => {
        it('should descruct tests', async () => {

            getInitData()
                .serviceProvider
                .getService(SQLConnectionService)
                .releaseConnectionClient();

            await getInitData()
                .serviceProvider
                .getService(SQLConnectionService)
                .endPoolAsync();
        });
    });
};