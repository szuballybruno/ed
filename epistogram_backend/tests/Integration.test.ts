import { UserController } from '../src/api/UserController';
import { setupTest as setupIntegrationTest } from './base';

setupIntegrationTest((getInitData) => {

    /**
     * test 1
     */
    describe('integration test 1', () => {
        it('is getting user 1', async () => {

            // const user = await getInitData()
            //     .serviceProvider
            //     .getService(UserService)
            //     .getUserById(1 as any);

            // expect(user.lastName)
            //     .toBe('Marosi');

            const result = getInitData()
                .listener
                .callEndpoint(UserController, 'saveUserAction', {
                    body: {
                        hello: 1
                    }
                });

            console.log(result);
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