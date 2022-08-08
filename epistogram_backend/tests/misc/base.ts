import { AuthenticationController } from '../../src/api/AuthenticationController';
import { GlobalConfiguration } from '../../src/services/misc/GlobalConfiguration';
import { SQLConnectionService } from '../../src/services/sqlServices/SQLConnectionService';
import { XDBMSchemaType } from '../../src/services/XDBManager/XDBManagerTypes';
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

export type TestParams = {
    serviceProvider: ServiceProvider,
    api: ApiType,
    accessToken: string,
    cookies: TestCookie[],
    getSeedData: XDBMSchemaType['seed']['getSeedData']
}

type TestFunctionsType = (getTestParams: () => TestParams) => Promise<void>;

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
    purge: boolean,
    title: string,
    throwError: boolean
}) => {

    JestLogger.logMain('Initializing integration tests...');

    const { tests, title, throwError } = opts;

    const { getServiceProviderAsync, singletonServiceProvider } = initServiceProvider(srcFolder, singletonProvider => {

        /**
         * OVERRIDE SETTINGS
         */
        singletonProvider
            .getService(GlobalConfiguration)
            .overrideLogScopes([]);
    });
    
    const api = new TestListener(throwError);
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync, api);
    const testParamsContainer: { testParams: TestParams } = {} as any;
    const getTestParams = () => {

        JestLogger.logMain('Getting init data...');

        const testParams = testParamsContainer.testParams;
        if (!testParams)
            throw new Error('Error, test init data is missing!');

        return testParams;
    };

    JestLogger.logMain('Setting timeout to 99999...');
    jest.setTimeout(999999);

    /**
     * --------------------- Init tests
     */
    describe('[INIT] Init tests...', () => {
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
            testParamsContainer.testParams = {
                serviceProvider: mainServiceProvider,
                api,
                accessToken,
                getSeedData: mainServiceProvider.getService(XDBMSchemaType).seed.getSeedData,
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

    describe(title, () => {
        customIt('is running the integration test.', async () => {

            await tests(getTestParams);
        });
    });

    /**
     * ----------------------- Destruct tests
     */
    describe('[DESCRTUCT] Destruct tests...', () => {
        customIt('should descruct tests.', async () => {

            JestLogger.logMain('Running destruct tests...');

            getTestParams()
                .serviceProvider
                .getService(SQLConnectionService)
                .releaseConnectionClient();

            await getTestParams()
                .serviceProvider
                .getService(SQLConnectionService)
                .endPoolAsync();
        });
    });
};

class IntegrationTestSetupBuilder {

    private _login: boolean = true;
    private _purge: boolean = true;
    private _throwError: boolean = true;
    private _tests: TestFunctionsType;

    constructor(private _title: string) {

    }

    noLogin() {
        this._login = false;
        return this;
    }

    noPurgeDB() {
        this._purge = false;
        return this;
    }

    noThrowError() {

        this._throwError = false;
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
            tests: this._tests,
            title: this._title,
            throwError: this._throwError
        });
    }
}

export const setupIntegrationTest = (title: string) => {

    return new IntegrationTestSetupBuilder(title);
};