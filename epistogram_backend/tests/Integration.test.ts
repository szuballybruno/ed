import { AuthenticationController } from '../src/api/AuthenticationController';
import { UserController } from '../src/api/UserController';
import { setupTest as setupIntegrationTest } from './misc/base';

setupIntegrationTest((getInitData) => {

    /**
     * test 1
     */
    describe('integration test 1', () => {
        it('is getting user 1', async () => {

            const { api } = getInitData();

            const loginResult = await api
                .callEndpoint(AuthenticationController, 'logInUserAction', {
                    body: {
                        email: 'endre.marosi@gmail.com',
                        password: 'admin'
                    }
                });

            const accessToken = loginResult.getCookieOrFail('accessToken');

            const result = await api
                .callEndpoint(UserController, 'getBriefUserDataAction', {
                    query: {
                        userId: 1
                    },
                    cookies: [
                        {
                            key: 'accessToken',
                            value: accessToken
                        }
                    ]
                });

            expect(result.response.data.fullName)
                .toBe('Endre Marosi');
        });
    });

    /**
     * test 2
     */
    describe('integration test 2', () => {
        it('is doing something', async () => {

            console.log('Something...');
        });
    });
});