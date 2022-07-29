import { UserService } from '../src/services/UserService';
import { setupTest as setupIntegrationTest } from './base';

setupIntegrationTest((getServiceProvider) => {

    /**
     * test 1
     */
     describe('integration test 1', () => {
        it('is getting user 1', async () => {

            const user = await getServiceProvider()
                .getService(UserService)
                .getUserById(1 as any);

            console.log(user);
        });
    });

    /**
     * test 2
     */
    describe('integration test 2', () => {
        it('is doing something', async () => {

            console.log('Something...');
            // const user = await getServiceProvider()
            //     .getService(UserService)
            //     .getUserById(1 as any);

            // console.log(user);
        });
    });
});