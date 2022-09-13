import { AuthenticationController } from '../../src/api/AuthenticationController';
import { GlobalConfiguration } from '../../src/services/misc/GlobalConfiguration';
import { SQLConnectionService } from '../../src/services/sqlServices/SQLConnectionService';
import { XDBMSchemaService } from '../../src/services/XDBManager/XDBManagerTypes';
import { initJsExtensions } from '../../src/shared/logic/jsExtensions';
import { ServiceProviderInitializator } from '../../src/startup/initApp';
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
    getSeedData: XDBMSchemaService['seed']['getSeedData']
}

type TestFunctionsType = (getTestParams: () => TestParams) => Promise<void>;

const loginUserAsync = async (api: ApiType) => {

    const loginResult = await api
        .callEndpoint(AuthenticationController, 'logInUserAction', {
            body: {
                email: 'bill.murry@epistogram.com',
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

    const initializator = new ServiceProviderInitializator(srcFolder, singletonProvider => {

        /**
         * OVERRIDE SETTINGS
         */
        singletonProvider
            .getService(GlobalConfiguration)
            .overrideLogScopes([]);
    });

    const getServiceProviderAsync = initializator.getInitializedTransientServices.bind(initializator);
    const api = new TestListener(throwError);
    const turboExpress = initTurboExpress(initializator, api);
    const testParamsContainer: { testParams: TestParams } = {} as any;
    const getTestParams = () => {

        JestLogger.logMain('Getting init data...');

        const testParams = testParamsContainer.testParams;
        if (!testParams)
            throw new Error('Error, test params data is missing!');

        return testParams;
    };

    JestLogger.logMain('Setting timeout to 99999...');
    jest.setTimeout(999999);

    const initTestAsync = async () => {

        JestLogger.logMain('Running init tests...');

        /**
         * PURGE
         */
        if (opts.purge) {

            JestLogger.logMain('Purging db...');
            await recreateDBAsync(getServiceProviderAsync);
        }

        /**
         * INIT MAIN SERVICE PROVIDER
         */
        const mainServiceProvider = await getServiceProviderAsync();

        /**
         * LOGIN USER
         */
        JestLogger.logMain('Logging in user...');
        const accessToken = opts.loginEnabled
            ? (await loginUserAsync(api)).accessToken
            : '';

        /**
         * SET INIT DATA
         */
        JestLogger.logMain('Setting init data...');
        const testParams = {
            serviceProvider: mainServiceProvider,
            api,
            accessToken,
            getSeedData: mainServiceProvider.getService(XDBMSchemaService).seed.getSeedData,
            cookies: [
                {
                    key: 'accessToken',
                    value: accessToken
                }
            ]
        };

        return testParams;
    };

    const destructTestsAsync = async (testParams: TestParams) => {

        JestLogger.logMain('Running destruct tests...');

        await testParams
            .serviceProvider
            .getService(SQLConnectionService)
            .releaseConnectionClient();

        await testParams
            .serviceProvider
            .getService(SQLConnectionService)
            .endPoolAsync();
    };

    /**
     * --------------------- Init tests
     */
    describe('Integration test wrapper.', () => {
        customIt('Wrap & run integration tests.', async () => {

            const testParams = await initTestAsync();
            await tests(() => testParams);
            await destructTestsAsync(testParams);
        });
    });
};

class IntegrationTestSetupBuilder {

    private _login: boolean = true;
    private _purge: boolean = true;
    private _throwError: boolean = true;
    private _logResError: boolean = true;
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

    noLogResError() {

        this._logResError = false;
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
