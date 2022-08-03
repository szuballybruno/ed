import { UserController } from '../src/api/UserController';
import { setupIntegrationTest } from './misc/base';
import { permissionTesterWrapper } from './misc/permissionTesterWrapper';

setupIntegrationTest('Testing permissions')
    .purgeDB()
    .addTests(async (getInitData) => {

        const { api, cookies, serviceProvider } = getInitData();

        await permissionTesterWrapper(
            serviceProvider,
            async (currentCode) => {

                const result = await api
                    .callEndpoint(UserController, 'getBriefUserDataAction', {
                        query: {
                            userId: 1
                        },
                        cookies
                    });

                if (currentCode === 'ACCESS_ADMIN') {

                    expect(result.response.code)
                        .toBe(200);

                    expect(result.response.data)
                        .not
                        .toBeNull();

                    expect(result.response.data)
                        .toHaveProperty('firstName');

                } else {

                    expect(result.response.code)
                        .not
                        .toBe(200);
                }

            });
    })
    .build();