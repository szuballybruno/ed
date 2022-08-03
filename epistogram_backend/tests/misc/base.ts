import { AuthenticationController } from '../../src/api/AuthenticationController';
import { SQLConnectionService } from '../../src/services/sqlServices/SQLConnectionService';
import { initJsExtensions } from '../../src/shared/logic/jsExtensions';
import { initServiceProvider } from '../../src/startup/initApp';
import { initTurboExpress } from '../../src/startup/instatiateTurboExpress';
import { recreateDBAsync } from '../../src/startup/recreateDB';
import { ServiceProvider } from '../../src/startup/servicesDI';
import { customIt } from './customHooks';
import { JestLogger } from './jestLogger';
import { normalizeJestConsole } from './normalizeConsole';
import { srcFolder } from './rootProvider';
import { TestCookie, TestListener } from './TestListener';

initJsExtensions();
normalizeJestConsole();

export type ApiType = Pick<TestListener, 'callEndpoint'>;

export type InitData = {
    serviceProvider: ServiceProvider,
    api: ApiType,
    accessToken: string,
    cookies: TestCookie[]
}

type TestFunctionsType = (getInitData: () => InitData) => void;

const loginUserAsync = async (api: ApiType) => {

    const loginResult = await api
        .callEndpoint(AuthenticationController, 'logInUserAction', {
            body: {
                email: 'endre.marosi@gmail.com',
                password: 'admin'
            }
        });

    const accessToken = loginResult.getCookieOrFail('accessToken');

    return { accessToken };
};

const _setupTest = (opts: {
    tests: TestFunctionsType,
    loginEnabled: boolean,
    purge: boolean
}) => {

    JestLogger.logMain('Initializing integration tests...');

    const { tests } = opts;

    const { getServiceProviderAsync, singletonServiceProvider } = initServiceProvider(srcFolder);
    const api = new TestListener();
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync, api);
    const initDataContainer: { initData: InitData } = {} as any;
    const getInitData = () => {

        JestLogger.logMain('Getting init data...');

        const initData = initDataContainer.initData;
        if (!initData)
            throw new Error('Error, test init data is missing!');

        return initData;
    };

    JestLogger.logMain('Setting timeout to 99999...');
    jest.setTimeout(999999);

    /**
     * --------------------- Init tests
     */
    describe('init tests', () => {
        customIt('should init tests', async () => {

            JestLogger.logMain('Running init tests...');

            /**
             * PURGE
             */
            if (opts.purge) {

                await recreateDBAsync(getServiceProviderAsync);
            }

            /**
             * INIT MAIN SERVICE PROVIDER
             */
            const mainServiceProvider = await getServiceProviderAsync();

            /**
             * LOGIN USER 
             */
            const accessToken = opts.loginEnabled
                ? (await loginUserAsync(api)).accessToken
                : '';

            /**
             * SET INIT DATA
             */
            initDataContainer.initData = {
                serviceProvider: mainServiceProvider,
                api,
                accessToken,
                cookies: [
                    {
                        key: 'accessToken',
                        value: accessToken
                    }
                ]
            };
        });
    });

    /**
     * Run tests 
     */
    tests(getInitData);

    /**
     * ----------------------- Destruct tests
     */
    describe('Destruct tests', () => {
        customIt('should descruct tests', async () => {

            JestLogger.logMain('Running destruct tests...');

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

export const setupTest = (tests: TestFunctionsType) => {

    _setupTest({
        tests,
        loginEnabled: true,
        purge: false
    });
};

class IntegrationTestSetupBuilder {

    private _login: boolean = true;
    private _purge: boolean = false;
    private _tests: TestFunctionsType;

    constructor() {

    }

    noLogin() {
        this._login = false;
        return this;
    }

    purgeDB() {
        this._purge = true;
        return this;
    }

    addTests(tests: TestFunctionsType) {
        this._tests = tests;
        return this;
    }

    build() {

        _setupTest({
            loginEnabled: this._login,
            purge: this._purge,
            tests: this._tests
        });
    }
}

export const setupIntegrationTest = () => {

    return new IntegrationTestSetupBuilder();
};