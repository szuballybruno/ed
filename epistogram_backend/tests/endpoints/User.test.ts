import {UserController} from '../../src/api/UserController';
import {setupIntegrationTest} from '../misc/base';
import {permissionTesterWrapper} from '../misc/permissionTesterWrapper';
import {PermissionCodeType} from '../../src/shared/types/sharedTypes';

setupIntegrationTest('Testing permissions')
    .addTests(async (getTestParams) => {

        const { api, cookies, serviceProvider } = getTestParams();

        const assignablePermissions: PermissionCodeType[] = ['ACCESS_ADMIN', 'VIEW_COMPANY_USERS'];

        await permissionTesterWrapper(
            assignablePermissions ,
            serviceProvider,
            async (currentPermissions) => {

                const result = await api
                    .callEndpoint(UserController, 'getBriefUserDataAction', {
                        query: {
                            userId: 1
                        },
                        cookies
                    });


                if (!currentPermissions) {

                    expect(result.response.code)
                        .not
                        .toBe(200);

                    expect(result.response.data)
                        .toHaveProperty('code');

                }

                if (currentPermissions && currentPermissions === assignablePermissions){

                    expect(result.response.code)
                        .toBe(200);


                    expect(result.response.data)
                        .toHaveProperty('firstName');
                }

            });
    })
    .noThrowError()
    .noLogResError()
    .build();
