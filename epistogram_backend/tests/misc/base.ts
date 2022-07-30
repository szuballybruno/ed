import { AuthenticationController } from '../../src/api/AuthenticationController';
import { SQLConnectionService } from '../../src/services/sqlServices/SQLConnectionService';
import { initServiceProvider } from '../../src/startup/initApp';
import { initTurboExpress } from '../../src/startup/instatiateTurboExpress';
import { ServiceProvider } from '../../src/startup/servicesDI';
import { TestCookie, TestListener } from './TestListener';

type ApiType = Pick<TestListener, 'callEndpoint'>;

type InitData = {
    serviceProvider: ServiceProvider,
    api: ApiType,
    accessToken: string,
    cookies: TestCookie[]
}

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

export const setupTest = (tests: (getInitData: () => InitData) => void, login?: 'NO LOGIN') => {

    const { getServiceProviderAsync, singletonServiceProvider } = initServiceProvider('');
    const api = new TestListener();
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync, api);
    const initDataContainer: { initData: InitData } = {} as any;
    const getInitData = () => initDataContainer.initData;

    /**
     * --------------------- Init tests
     */
    describe('init tests', () => {
        it('should init tests', async () => {

            const serviceProvider = await getServiceProviderAsync();
            const accessToken = login === 'NO LOGIN'
                ? ''
                : (await loginUserAsync(api)).accessToken;

            // create init data
            initDataContainer.initData = {
                serviceProvider,
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