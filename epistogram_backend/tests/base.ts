import { SQLConnectionService } from '../src/services/sqlServices/SQLConnectionService';
import { initServiceProvider } from '../src/startup/initApp';
import { ServiceProvider } from '../src/startup/servicesDI';

export const setupTest = (tests: (getServiceProvider: () => ServiceProvider) => void) => {

    const { getServiceProviderAsync } = initServiceProvider('');
    const serviceProviderContainer: { sp: ServiceProvider | null } = { sp: null };
    const getServiceProvider = () => serviceProviderContainer.sp!;

    /**
     * --------------------- Init tests
     */
    describe('init tests', () => {
        it('should init tests', async () => {
            serviceProviderContainer.sp = await getServiceProviderAsync();
        });
    });

    tests(getServiceProvider);

    /**
     * ----------------------- Destruct tests
     */
    describe('Destruct tests', () => {
        it('should descruct tests', async () => {

            getServiceProvider()
                .getService(SQLConnectionService)
                .releaseConnectionClient();

            await getServiceProvider()
                .getService(SQLConnectionService)
                .endPoolAsync();
        });
    });
};