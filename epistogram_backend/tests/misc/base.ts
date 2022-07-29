import { SQLConnectionService } from '../../src/services/sqlServices/SQLConnectionService';
import { initServiceProvider } from '../../src/startup/initApp';
import { initTurboExpress } from '../../src/startup/instatiateTurboExpress';
import { ServiceProvider } from '../../src/startup/servicesDI';
import { TestListener } from './TestListener';

type InitData = {
    serviceProvider: ServiceProvider,
    api: Pick<TestListener, 'callEndpoint'>
}

export const setupTest = (tests: (getInitData: () => InitData) => void) => {

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

            // create init data
            initDataContainer.initData = {
                serviceProvider: await getServiceProviderAsync(),
                api,
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